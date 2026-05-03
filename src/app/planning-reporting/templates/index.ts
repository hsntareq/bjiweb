import { WardDawatTemplate } from './dawat/WardDawatTemplate';
import { ThanaDawatTemplate } from './dawat/ThanaDawatTemplate';
import { WardOrgTemplate } from './org/WardOrgTemplate';
import { ThanaOrgTemplate } from './org/ThanaOrgTemplate';
import { WardTrainingTemplate } from './training/WardTrainingTemplate';
import { ThanaTrainingTemplate } from './training/ThanaTrainingTemplate';
import { WardSocialWelfareTemplate } from './socialWelfare/WardSocialWelfareTemplate';
import { WardStateReformTemplate } from './stateReform/WardStateReformTemplate';
import { WardBaitulmalTemplate } from './baitulmal/WardBaitulmalTemplate';
import { WardRemarkCommentTemplate } from './remarkComment/WardRemarkCommentTemplate';

export type OrgLevel = 'WARD' | 'THANA' | 'CITY' | 'CENTRAL' | 'UNIT';

export function getDawatTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'THANA') return ThanaDawatTemplate;
  return WardDawatTemplate;
}

export function getOrgTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'THANA') return ThanaOrgTemplate;
  return WardOrgTemplate;
}

export function getTrainingTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'THANA') return ThanaTrainingTemplate;
  return WardTrainingTemplate;
}

export function getSocialWelfareTemplate(_orgLevel: OrgLevel) {
  return WardSocialWelfareTemplate;
}

export function getStateReformTemplate(_orgLevel: OrgLevel) {
  return WardStateReformTemplate;
}

export function getBaitulmalTemplate(_orgLevel: OrgLevel) {
  return WardBaitulmalTemplate;
}

export function getRemarkCommentTemplate(_orgLevel: OrgLevel) {
  return WardRemarkCommentTemplate;
}
