export interface ReportSectionProps {
  compReport: any;
  formatVal: (val: any) => string | number;
  canEdit: boolean;
  onSave: (section: string, data: any) => Promise<void>;
  onSaveMultiple?: (updates: Record<string, any>) => Promise<void>;
  saving: boolean;
}
