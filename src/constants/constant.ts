export enum ErolesUser {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  LIBRARIAN = 'LIBRARIAN',
  ACCOUNTANT = 'ACCOUNTANT',
}

export enum EstatusUser {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

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

export enum EtypeStatusSubjectStudy {
  PASS = 'PASS',
  FAILED = 'FAILED',
}

export enum EtypeLearningRate {
  TEN_POINT_SCALE = 'TEN_POINT_SCALE',
  FOUR_POINT_SCALE = 'FOUR_POINT_SCALE',
  POINT_TRAINNING = 'POINT_TRAINNING',
}

export const trainningPointDefault = 60;

export enum EtypeVolunteeProgram {
  UNIVERSITY = 'UNIVERSITY',
  FACULTY = 'FACULTY',
}
