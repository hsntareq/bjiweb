import { WardDawatTemplate } from './dawat/WardDawatTemplate';
import { ThanaDawatTemplate } from './dawat/ThanaDawatTemplate';
import { UnitDawatTemplate } from './dawat/UnitDawatTemplate';

import { WardOrgTemplate } from './org/WardOrgTemplate';
import { ThanaOrgTemplate } from './org/ThanaOrgTemplate';
import { UnitOrgTemplate } from './org/UnitOrgTemplate';

import { WardTrainingTemplate } from './training/WardTrainingTemplate';
import { ThanaTrainingTemplate } from './training/ThanaTrainingTemplate';
import { UnitTrainingTemplate } from './training/UnitTrainingTemplate';

import { WardSocialWelfareTemplate } from './socialWelfare/WardSocialWelfareTemplate';
import { UnitSocialWelfareTemplate } from './socialWelfare/UnitSocialWelfareTemplate';

import { WardStateReformTemplate } from './stateReform/WardStateReformTemplate';
import { UnitStateReformTemplate } from './stateReform/UnitStateReformTemplate';

import { WardBaitulmalTemplate } from './baitulmal/WardBaitulmalTemplate';
import { UnitBaitulmalTemplate } from './baitulmal/UnitBaitulmalTemplate';

import { WardRemarkCommentTemplate } from './remarkComment/WardRemarkCommentTemplate';
import { UnitRemarkCommentTemplate } from './remarkComment/UnitRemarkCommentTemplate';

export type OrgLevel = 'WARD' | 'THANA' | 'CITY' | 'CENTRAL' | 'UNIT';

export function getDawatTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'THANA') return ThanaDawatTemplate;
  if (orgLevel === 'UNIT') return UnitDawatTemplate;
  return WardDawatTemplate;
}

export function getOrgTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'THANA') return ThanaOrgTemplate;
  if (orgLevel === 'UNIT') return UnitOrgTemplate;
  return WardOrgTemplate;
}

export function getTrainingTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'THANA') return ThanaTrainingTemplate;
  if (orgLevel === 'UNIT') return UnitTrainingTemplate;
  return WardTrainingTemplate;
}

export function getSocialWelfareTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'UNIT') return UnitSocialWelfareTemplate;
  return WardSocialWelfareTemplate;
}

export function getStateReformTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'UNIT') return UnitStateReformTemplate;
  return WardStateReformTemplate;
}

export function getBaitulmalTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'UNIT') return UnitBaitulmalTemplate;
  return WardBaitulmalTemplate;
}

export function getRemarkCommentTemplate(orgLevel: OrgLevel) {
  if (orgLevel === 'UNIT') return UnitRemarkCommentTemplate;
  return WardRemarkCommentTemplate;
}
