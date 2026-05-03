export interface ReportSectionProps {
  compReport: any;
  formatVal: (val: any) => string | number;
  canEdit: boolean;
  onSave: (section: string, data: any) => void;
  saving: boolean;
}
