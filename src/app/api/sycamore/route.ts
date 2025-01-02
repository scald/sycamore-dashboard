import { NextRequest, NextResponse } from 'next/server';
import { Student, GradeEntry, User } from '@/lib/types/sycamore';

const SYCAMORE_API_URL = 'https://app.sycamoreschool.com/api/v1';
const SYCAMORE_API_KEY = process.env.SYCAMORE_API_KEY;

if (!SYCAMORE_API_KEY) {
    throw new Error('SYCAMORE_API_KEY environment variable is not set');
}

async function fetchFromSycamore(endpoint: string) {
    console.log(`[Sycamore API] Fetching from endpoint: ${endpoint}`);

    const url = `${SYCAMORE_API_URL}${endpoint}`;
    console.log(`[Sycamore API] Full URL: ${url}`);

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${SYCAMORE_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    console.log(`[Sycamore API] Response status: ${response.status}`);
    console.log(`[Sycamore API] Response status text: ${response.statusText}`);

    const responseText = await response.text();
    console.log(`[Sycamore API] Raw response: ${responseText}`);

    if (!response.ok) {
        let errorMessage = `API request failed with status ${response.status}`;
        try {
            if (responseText) {
                const error = JSON.parse(responseText);
                errorMessage = error.message || errorMessage;
            }
        } catch (e) {
            console.error('[Sycamore API] Error parsing error response:', e);
            errorMessage += `. Raw response: ${responseText}`;
        }
        throw new Error(errorMessage);
    }

    try {
        return responseText ? JSON.parse(responseText) : null;
    } catch (e) {
        console.error('[Sycamore API] Error parsing success response:', e);
        throw new Error(`Failed to parse API response. Raw response: ${responseText}`);
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const action = searchParams.get('action');
        const studentId = searchParams.get('studentId');

        console.log(`[Sycamore API] Processing action: ${action}`);

        switch (action) {
            case 'me':
                console.log('[Sycamore API] Fetching user info');
                const me: User = await fetchFromSycamore('/Me');
                return NextResponse.json(me);

            case 'students': {
                console.log('[Sycamore API] Fetching students - Step 1: Get user info');
                const user: User = await fetchFromSycamore('/Me');
                console.log(`[Sycamore API] Got family ID: ${user.FamilyID}`);

                console.log('[Sycamore API] Fetching students - Step 2: Get students for family');
                const students: Student[] = await fetchFromSycamore(`/Family/${user.FamilyID}/Students`);
                console.log(`[Sycamore API] Found ${students.length} students`);

                return NextResponse.json(students);
            }

            case 'grades':
                if (!studentId) {
                    return NextResponse.json(
                        { error: 'Student ID is required' },
                        { status: 400 }
                    );
                }
                console.log(`[Sycamore API] Fetching grades for student: ${studentId}`);
                const grades: GradeEntry[] = await fetchFromSycamore(`/Student/${studentId}/Grades`);
                console.log(`[Sycamore API] Found ${grades.length} grades`);
                return NextResponse.json(grades);

            default:
                console.log(`[Sycamore API] Invalid action: ${action}`);
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('[Sycamore API] Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
} 