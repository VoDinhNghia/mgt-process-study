export const roles = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  LECTURER: 'LECTURER',
  LIBRARIAN: 'LIBRARIAN',
};

export enum ErolesEnum {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  LIBRARIAN = 'LIBRARIAN',
}

export const permission = {
  FULL: ['ADMIN', 'STUDENT', 'LECTURER', 'LIBRARIAN'],
  LECTURER: ['ADMIN', 'LECTURER'],
  STUDENT: ['ADMIN', 'LECTURER', 'STUDENT'],
  LIBRARIAN: ['ADMIN', 'LIBRARIAN'],
  ADMIN: ['ADMIN'],
};

export const roleTypeAccessApi = {
  FULL: 'FULL',
  LECTURER: 'LECTURER',
  STUDENT: 'STUDENT',
  LIBRARIAN: 'LIBRARIAN',
  ADMIN: 'ADMIN',
};

export const statusUser = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ENUM: ['ACTIVE', 'INACTIVE'],
};

export enum EstatusUserProfile {
  STUDYING = 'STUDYING',
  GRADUATE = 'GRADUATE',
  SAVEING = 'SAVEING',
  RESERVE = 'RESERVE',
  LEAVE = 'LEAVE',
}

export const keyAccessBackend = 'course-access-key-secrect';

export enum EtypeConfigCoditionPassSubject {
  FINAL_EXAM_POINT = 'FINAL_EXAM_POINT',
  ACCUMULATED_POINT = 'ACCUMULATED_POINT',
}
