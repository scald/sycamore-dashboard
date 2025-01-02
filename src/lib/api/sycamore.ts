import { Student, GradeEntry, User } from '../types/sycamore';

class SycamoreAPI {
    private async fetchFromAPI(endpoint: string) {
        const response = await fetch(endpoint);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }

        return response.json();
    }

    async getMe(): Promise<User> {
        return this.fetchFromAPI('/api/sycamore?action=me');
    }

    async getStudents(): Promise<Student[]> {
        return this.fetchFromAPI('/api/sycamore?action=students');
    }

    async getGrades(studentId: string): Promise<GradeEntry[]> {
        const params = new URLSearchParams({
            action: 'grades',
            studentId,
        });
        return this.fetchFromAPI(`/api/sycamore?${params}`);
    }
}

export const createSycamoreAPI = () => new SycamoreAPI(); 