export type Locale = "en" | "fa" | "ps";

export interface Dictionary {
  app: {
    name: string;
    tagline: string;
  };
  nav: {
    dashboard: string;
    builder: string;
    templates: string;
    settings: string;
  };
  locales: {
    en: string;
    fa: string;
    ps: string;
  };
  topbar: {
    print: string;
    autosaved: string;
    theme: string;
    reset: string;
    resetConfirm: string;
    printHint: string;
    printDialogTitle: string;
    printDialogBody: string;
    printStep1: string;
    printStep2: string;
    printStep3: string;
    printDontShowAgain: string;
  };
  sidebar: {
    sections: string;
    dragHint: string;
    addSection: string;
    appearance: string;
    accentColor: string;
    fontPairing: string;
    layout: string;
    layoutClassic: string;
    layoutSidebar: string;
    showPhoto: string;
  };
  sections: {
    personal: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    certifications: string;
  };
  fields: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    photo: string;
    uploadPhoto: string;
    removePhoto: string;
    summary: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    present: string;
    description: string;
    school: string;
    degree: string;
    field: string;
    skillName: string;
    languageName: string;
    proficiency: string;
    certName: string;
    certIssuer: string;
    certDate: string;
  };
  actions: {
    add: string;
    remove: string;
    addExperience: string;
    addEducation: string;
    addSkill: string;
    addLanguage: string;
    addCertification: string;
    moveUp: string;
    moveDown: string;
    toggleVisible: string;
  };
  placeholders: {
    fullName: string;
    jobTitle: string;
    summary: string;
    company: string;
    role: string;
    school: string;
    degree: string;
    skill: string;
    language: string;
    certName: string;
    certIssuer: string;
  };
  proficiencyLevels: {
    basic: string;
    conversational: string;
    fluent: string;
    native: string;
  };
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    confirmPassword: string;
    noAccount: string;
    createOne: string;
    haveAccount: string;
    signIn: string;
    checkEmail: string;
    passwordMismatch: string;
    genericError: string;
    welcomeBack: string;
    welcomeBackSubtitle: string;
    createAccount: string;
    createAccountSubtitle: string;
    signOut: string;
    signedInAs: string;
    admin: string;
  };
  admin: {
    title: string;
    subtitle: string;
    users: string;
    email: string;
    joined: string;
    ip: string;
    location: string;
    resumes: string;
    lastActivity: string;
    noUsers: string;
    viewResume: string;
    close: string;
    notAvailable: string;
    role: string;
    resumeFor: string;
    fields: string;
    language: string;
    sectionsUsed: string;
    accent: string;
    userAgent: string;
  };
  data: {
    exportJson: string;
    importJson: string;
    invalidFile: string;
    importSuccess: string;
  };
  empty: {
    experience: string;
    education: string;
    skills: string;
    languages: string;
    certifications: string;
  };
}
