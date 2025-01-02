export interface User {
    UserID: number;
    SchoolID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    FamilyID: number;
    StudentID: number;
    Level: string;
    SuperUser: number;
    Active: number;
    Current: number;
    Scopes: string;
}

export interface Student {
    ID: number;
    Code: string;
    FirstName: string;
    LastName: string;
    Grade: string;
    DOB: string;
    Gender: string;
}

export interface GradeEntry {
    ID: number;
    ClassID: number;
    ClassName: string;
    SubjectID: number;
    SubjectName: string;
    Number: string;
    Letter: string;
    Comments: string;
    Viewable: number;
    PDate: string;
}

export interface SycamoreApiError {
    error: string;
    message: string;
    status: number;
}