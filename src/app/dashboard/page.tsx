'use client';

import { useEffect, useState } from 'react';
import { Student, GradeEntry } from '@/lib/types/sycamore';
import { createSycamoreAPI } from '@/lib/api/sycamore';

interface StudentGrades {
    student: Student;
    grades: GradeEntry[];
}

export default function Dashboard() {
    const [studentsGrades, setStudentsGrades] = useState<StudentGrades[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const api = createSycamoreAPI();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const students = await api.getStudents();
                const gradesPromises = students.map(student =>
                    api.getGrades(student.ID.toString())
                        .then(grades => ({
                            student,
                            grades: grades.sort((a, b) => Number(b.Number) - Number(a.Number))
                        }))
                );

                const allGrades = await Promise.all(gradesPromises);
                setStudentsGrades(allGrades);
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    const getGradeColor = (grade: number) => {
        if (grade >= 93) return 'text-emerald-400';
        if (grade >= 85) return 'text-blue-400';
        if (grade >= 77) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studentsGrades.map(({ student, grades }) => (
                        <div
                            key={student.ID}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700"
                        >
                            <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-700">
                                <h2 className="text-xl font-semibold mb-1">
                                    {student.FirstName}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {/* {student.Grade} */}
                                </p>
                            </div>

                            <div className="p-4">
                                <div className="space-y-3">
                                    {grades.map((grade) => (
                                        <div
                                            key={grade.ID}
                                            className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-medium">{grade.ClassName}</h3>
                                                <p className="text-sm text-gray-400">{grade.PDate}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={`text-lg font-semibold ${getGradeColor(Number(grade.Number))}`}>
                                                    {grade.Number}%
                                                </div>
                                                <div className="text-sm px-2 py-1 rounded bg-gray-700">
                                                    {grade.Letter}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {grades.length === 0 && (
                                        <div className="text-center text-gray-500 py-4">
                                            No grades available
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-700">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-400">
                                        Average:
                                    </div>
                                    <div className={`text-lg font-bold ${getGradeColor(
                                        grades.length > 0
                                            ? Math.round(grades.reduce((sum, g) => sum + Number(g.Number), 0) / grades.length)
                                            : 0
                                    )
                                        }`}>
                                        {grades.length > 0
                                            ? Math.round(grades.reduce((sum, g) => sum + Number(g.Number), 0) / grades.length)
                                            : 'N/A'}
                                        {grades.length > 0 && '%'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 