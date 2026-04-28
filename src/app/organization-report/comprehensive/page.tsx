"use client";

import React, { useState } from 'react';
import { 
  BarChart3, Package, Target, TrendingUp, Users, 
  BookOpen, Heart, Users2, MessageSquare, Plus, 
  Save, ChevronRight, LayoutDashboard, FileText,
  CheckCircle2, AlertCircle, Info, Calendar,
  Briefcase, GraduationCap, MapPin, User
} from "lucide-react";
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { MonthlyReportPrint } from '@/components/Reporting/MonthlyReportPrint';
import LanguageToggle from '@/components/LanguageToggle';
import ModuleSwitcher from '@/components/ModuleSwitcher';

export default function ComprehensiveReportPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State matching the entity JSONB structure
  const [formData, setFormData] = useState({
    organizationId: 1, // Default for now
    year: 2025,
    month: 3,
    headerInfo: {
      wardName: '',
      thanaName: '',
      presidentName: '',
      totalPopulation: 0,
      monthlyTarget: 0
    },
    unitDawat: {
      groupCount: 0,
      participantCount: 0,
      reachedCount: 0,
      newAssociateCount: 0
    },
    personalDawat: {
      rukanTotal: 0,
      rukanDawat: 0,
      karmiTotal: 0,
      karmiDawat: 0,
      totalReached: 0,
      totalNewAssociate: 0
    },
    generalMeeting: {
      totalReached: 0,
      totalNewAssociate: 0
    },
    publicRelations: {
      // Different campaigns
      campaigns: [
        { label: 'গণসংযোগ দশক/পক্ষ', groups: 0, participants: 0, reached: 0, associates: 0 },
        { label: 'জেলা/মহানগর ঘোষিত অভিযান', groups: 0, participants: 0, reached: 0, associates: 0 },
        { label: 'নির্বাচনী আসনে গণসংযোগ', groups: 0, participants: 0, reached: 0, associates: 0 },
        { label: 'উলামা/পেশাজীবী গণসংযোগ', groups: 0, participants: 0, reached: 0, associates: 0 }
      ]
    },
    departmentalInfo: {
      quran: {
        rukanEducators: 0,
        karmiEducators: 0,
        totalEducators: 0,
        quranGroups: 0,
        totalStudents: 0,
        sahihTilawatLearners: 0,
        reached: 0,
        associates: 0
      },
      mahalla: {
        totalMahalla: 0,
        committeeCount: 0,
        specialDawahMahalla: 0,
        reached: 0,
        associates: 0
      },
      youth: {
        reached: 0,
        associates: 0,
        committeeCount: 0,
        newClubCount: 0,
        clubReached: 0
      },
      professions: [
        { type: 'রাজনৈতিক/বিশিষ্ট', reached: 0, associates: 0, target: 0 },
        { type: 'পেশাজীবী/উলামা', reached: 0, associates: 0, target: 0 },
        { type: 'শ্রমজীবী', reached: 0, associates: 0, target: 0 },
        { type: 'প্রান্তিক জনগোষ্ঠী', reached: 0, associates: 0, target: 0 }
      ],
      family: {
        participatingFamilies: 0,
        newReachedFamilies: 0
      },
      mosque: {
        totalMosque: 0,
        reachedMosque: 0,
        dawahCenterTotal: 0,
        newDawahCenter: 0,
        informationCenter: 0
      },
      it: {
        suitableManpower: 0,
        participatingManpower: 0
      }
    },
    dawahPublication: {
      libraryBookDistribution: 0,
      softCopyDistribution: 0,
      linkDistribution: 0,
      paperMagazineDistribution: 0
    },
    finance: {
      baitulmalBudget: 0,
      baitulmalCollection: 0
    },
    miscellaneous: {
      programs: [
        { label: 'ইউনিট সাধারণ সভা', total: 0, target: 0, avgAttendance: 0 },
        { label: 'দাওয়াতি সভা', total: 0, target: 0, avgAttendance: 0 },
        { label: 'সীরাতুন্নবী মাহফিল', total: 0, target: 0, avgAttendance: 0 },
        { label: 'দর্স/তাফসীর', total: 0, target: 0, avgAttendance: 0 }
      ],
      manpower: {
        rukan: { prev: 0, present: 0, increase: 0, decrease: 0, target: 0 },
        rukanCandidate: { prev: 0, present: 0, increase: 0, target: 0 },
        karmi: { prev: 0, present: 0, increase: 0, target: 0 },
        activeAssociate: { prev: 0, present: 0, increase: 0, target: 0 }
      }
    }
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section: string, subSection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [subSection]: {
          ...(prev as any)[section][subSection],
          [field]: value
        }
      }
    }));
  };

  const saveReport = async () => {
    setIsSubmitting(true);
    // API Call Logic here
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Report saved successfully!');
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Comprehensive Monthly Report</h1>
              <p className="text-sm text-slate-500 font-medium">Ward Organization • March 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ModuleSwitcher />
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <FileText className="w-5 h-5" />
              <span>Print Template</span>
            </button>
            <button 
              onClick={saveReport}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{isSubmitting ? 'Saving...' : 'Save Report'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Navigation Steps */}
        <div className="flex items-center justify-between mb-12 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          {[
            { icon: Info, label: 'Header' },
            { icon: MessageSquare, label: 'Dawah' },
            { icon: GraduationCap, label: 'Education' },
            { icon: Users2, label: 'Org' },
            { icon: Heart, label: 'Social' }
          ].map((step, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`flex flex-col items-center gap-2 px-6 py-3 rounded-2xl transition-all ${activeStep === idx ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <step.icon className={`w-6 h-6 ${activeStep === idx ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs font-bold uppercase tracking-wider">{step.label}</span>
            </button>
          ))}
        </div>

        {/* Section 1: Header Info */}
        <ReportAccordionSection 
          title="প্রাথমিক তথ্য (Basic Information)" 
          icon={Info}
          defaultOpen={activeStep === 0}
        >
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">ওয়ার্ডের নাম</label>
              <input 
                type="text" 
                value={formData.headerInfo.wardName}
                onChange={(e) => handleNestedInputChange('headerInfo', '', 'wardName', e.target.value)}
                placeholder="উদাঃ যুব ওয়ার্ড"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">থানা/বিভাগ</label>
              <input 
                type="text" 
                value={formData.headerInfo.thanaName}
                onChange={(e) => handleNestedInputChange('headerInfo', '', 'thanaName', e.target.value)}
                placeholder="উদাঃ খিলগাঁও উত্তর থানা"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">সভাপতি/দায়িত্বশীলের নাম</label>
              <input 
                type="text" 
                value={formData.headerInfo.presidentName}
                onChange={(e) => handleNestedInputChange('headerInfo', '', 'presidentName', e.target.value)}
                placeholder="পূর্ণ নাম লিখুন"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">মোট জনসংখ্যা</label>
                <input 
                  type="number" 
                  value={formData.headerInfo.totalPopulation}
                  onChange={(e) => handleNestedInputChange('headerInfo', '', 'totalPopulation', parseInt(e.target.value))}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">মাসিক টার্গেট</label>
                <input 
                  type="number" 
                  value={formData.headerInfo.monthlyTarget}
                  onChange={(e) => handleNestedInputChange('headerInfo', '', 'monthlyTarget', parseInt(e.target.value))}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </ReportAccordionSection>

        {/* Section 2: Dawah & Tabligh */}
        <ReportAccordionSection 
          title="দাওয়াত ও তাবলীগী (Dawah & Tabligh)" 
          icon={MessageSquare}
          defaultOpen={activeStep === 1}
        >
          <div className="space-y-10 pt-4">
            {/* Unit Dawah */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                ১. ইউনিটে নিয়মিত গ্রুপভিত্তিক দাওয়াত
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'কতটি গ্রুপ বের হয়েছে', field: 'groupCount' },
                  { label: 'অংশগ্রহণকারীর সংখ্যা', field: 'participantCount' },
                  { label: 'দাওয়াত পৌঁছানো হয়েছে', field: 'reachedCount' },
                  { label: 'সহযোগী সদস্য বৃদ্ধি', field: 'newAssociateCount' }
                ].map((item) => (
                  <div key={item.field} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <label className="text-xs font-bold text-slate-500 block mb-2">{item.label}</label>
                    <input 
                      type="number" 
                      value={(formData.unitDawat as any)[item.field]}
                      onChange={(e) => handleNestedInputChange('unitDawat', '', item.field, parseInt(e.target.value))}
                      className="w-full bg-transparent text-xl font-bold text-slate-900 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Dawah */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                ২. ব্যক্তিগত ও টার্গেটভিত্তিক দাওয়াত
              </h4>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">বিবরণ</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">রুকন</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">কর্মী</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">মোট জনশক্তি</td>
                      <td className="px-6 py-4">
                        <input type="number" className="w-20 px-3 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.personalDawat.rukanTotal} onChange={(e) => handleNestedInputChange('personalDawat', '', 'rukanTotal', parseInt(e.target.value))} />
                      </td>
                      <td className="px-6 py-4">
                        <input type="number" className="w-20 px-3 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.personalDawat.karmiTotal} onChange={(e) => handleNestedInputChange('personalDawat', '', 'karmiTotal', parseInt(e.target.value))} />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">ব্যক্তিগত দাওয়াতী কাজ করেছেন</td>
                      <td className="px-6 py-4">
                        <input type="number" className="w-20 px-3 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.personalDawat.rukanDawat} onChange={(e) => handleNestedInputChange('personalDawat', '', 'rukanDawat', parseInt(e.target.value))} />
                      </td>
                      <td className="px-6 py-4">
                        <input type="number" className="w-20 px-3 py-2 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.personalDawat.karmiDawat} onChange={(e) => handleNestedInputChange('personalDawat', '', 'karmiDawat', parseInt(e.target.value))} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ReportAccordionSection>

        {/* Section 3: Departmental Info */}
        <ReportAccordionSection 
          title="বিভাগীয় তথ্য (Departmental Info)" 
          icon={LayoutDashboard}
          defaultOpen={activeStep === 2}
        >
          <div className="space-y-10 pt-4">
            {/* Quran Education */}
            <div className="bg-emerald-50/30 p-8 rounded-[2.5rem] border border-emerald-100/50">
              <h4 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                ১. তালিমুল কুরআনের মাধ্যমে দাওয়াত
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
                  <label className="text-xs font-bold text-emerald-600 uppercase mb-3 block">ব্যক্তিগত উদ্যোগ</label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">শিক্ষাদানকারী (রুকন)</span>
                      <input type="number" className="w-16 px-3 py-2 bg-slate-50 rounded-xl outline-none" value={formData.departmentalInfo.quran.rukanEducators} onChange={(e) => handleNestedInputChange('departmentalInfo', 'quran', 'rukanEducators', parseInt(e.target.value))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">শিক্ষাদানকারী (কর্মী)</span>
                      <input type="number" className="w-16 px-3 py-2 bg-slate-50 rounded-xl outline-none" value={formData.departmentalInfo.quran.karmiEducators} onChange={(e) => handleNestedInputChange('departmentalInfo', 'quran', 'karmiEducators', parseInt(e.target.value))} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
                  <label className="text-xs font-bold text-emerald-600 uppercase mb-3 block">সামষ্টিক উদ্যোগ</label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">কুরআন শিক্ষার গ্রুপ</span>
                      <input type="number" className="w-16 px-3 py-2 bg-slate-50 rounded-xl outline-none" value={formData.departmentalInfo.quran.quranGroups} onChange={(e) => handleNestedInputChange('departmentalInfo', 'quran', 'quranGroups', parseInt(e.target.value))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">মোট শিক্ষার্থী সংখ্যা</span>
                      <input type="number" className="w-16 px-3 py-2 bg-slate-50 rounded-xl outline-none" value={formData.departmentalInfo.quran.totalStudents} onChange={(e) => handleNestedInputChange('departmentalInfo', 'quran', 'totalStudents', parseInt(e.target.value))} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
                  <label className="text-xs font-bold text-emerald-600 uppercase mb-3 block">ফলাফল</label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">সহীহ তিলাওয়াত শিখেছে</span>
                      <input type="number" className="w-16 px-3 py-2 bg-slate-50 rounded-xl outline-none" value={formData.departmentalInfo.quran.sahihTilawatLearners} onChange={(e) => handleNestedInputChange('departmentalInfo', 'quran', 'sahihTilawatLearners', parseInt(e.target.value))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">দাওয়াত পৌঁছেছে</span>
                      <input type="number" className="w-16 px-3 py-2 bg-slate-50 rounded-xl outline-none" value={formData.departmentalInfo.quran.reached} onChange={(e) => handleNestedInputChange('departmentalInfo', 'quran', 'reached', parseInt(e.target.value))} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Youth Dawah */}
            <div className="bg-indigo-50/30 p-8 rounded-[2.5rem] border border-indigo-100/50">
              <h4 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  <Users2 className="w-5 h-5" />
                </div>
                ২. যুব সমাজের মাঝে দাওয়াত
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'দাওয়াত পৌঁছেছে', field: 'reached' },
                  { label: 'সহযোগী বৃদ্ধি', field: 'associates' },
                  { label: 'যুব কমিটি', field: 'committeeCount' },
                  { label: 'নতুন সমিতি/ক্লাব', field: 'newClubCount' },
                  { label: 'ক্লাবে দাওয়াত', field: 'clubReached' }
                ].map((item) => (
                  <div key={item.field} className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                    <label className="text-xs font-bold text-indigo-500 uppercase block mb-2">{item.label}</label>
                    <input 
                      type="number" 
                      value={(formData.departmentalInfo.youth as any)[item.field]}
                      onChange={(e) => handleNestedInputChange('departmentalInfo', 'youth', item.field, parseInt(e.target.value))}
                      className="w-full bg-transparent text-xl font-bold text-slate-900 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ReportAccordionSection>

        {/* Section 4: Manpower & Organization */}
        <ReportAccordionSection 
          title="সংগঠন ও জনশক্তি (Organization & Manpower)" 
          icon={Users}
          defaultOpen={activeStep === 3}
        >
          <div className="space-y-10 pt-4">
            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">জনশক্তি ধরণ</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">পূর্বের সংখ্যা</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">বর্তমান সংখ্যা</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">বৃদ্ধি</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">টার্গেট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(formData.miscellaneous.manpower).map(([key, data]) => (
                    <tr key={key} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700 capitalize">
                        {key === 'rukan' ? 'রুকন (Member)' : 
                         key === 'rukanCandidate' ? 'রুকন প্রার্থী' : 
                         key === 'karmi' ? 'কর্মী (Activist)' : 'সক্রিয় সহযোগী'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input type="number" className="w-16 px-2 py-1 bg-slate-50 rounded-lg text-center outline-none focus:ring-2 focus:ring-indigo-500" value={(data as any).prev} onChange={(e) => handleNestedInputChange('miscellaneous', 'manpower', `${key}.prev` as any, parseInt(e.target.value))} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input type="number" className="w-16 px-2 py-1 bg-slate-50 rounded-lg text-center outline-none focus:ring-2 focus:ring-indigo-500" value={(data as any).present} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input type="number" className="w-16 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-center outline-none" value={(data as any).increase} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input type="number" className="w-16 px-2 py-1 bg-slate-50 rounded-lg text-center outline-none focus:ring-2 focus:ring-indigo-500" value={(data as any).target} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ReportAccordionSection>
        {/* Section 5: Social Welfare */}
        <ReportAccordionSection 
          title="সমাজসেবা (Social Welfare)" 
          icon={Heart}
          defaultOpen={activeStep === 4}
        >
          <div className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-rose-50/30 p-6 rounded-3xl border border-rose-100/50">
                <h4 className="text-sm font-bold text-rose-900 mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  সেবামূলক কার্যক্রম
                </h4>
                <div className="space-y-3">
                  {[
                    'স্বেচ্ছায় রক্তদান',
                    'অসহায় রোগীকে চিকিৎসা সহায়তা',
                    'ত্রাণ ও পুনর্বাসন'
                  ].map((label, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-rose-100 shadow-sm">
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                      <input type="number" className="w-16 px-2 py-1 bg-slate-50 rounded-lg text-center outline-none" defaultValue={0} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50/30 p-6 rounded-3xl border border-blue-100/50">
                <h4 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  সামাজিক প্রকল্প
                </h4>
                <div className="space-y-3">
                  {[
                    'পরিচ্ছন্নতা অভিযান',
                    'সামাজিক সচেতনতা বৃদ্ধি',
                    'যৌতুক ও মাদক বিরোধী প্রচারণা'
                  ].map((label, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-blue-100 shadow-sm">
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                      <input type="number" className="w-16 px-2 py-1 bg-slate-50 rounded-lg text-center outline-none" defaultValue={0} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ReportAccordionSection>
      </main>

      {/* Quick Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl shadow-slate-900/10 z-40 print:hidden">
        <button className="p-3 text-slate-500 hover:text-indigo-600 transition-colors" title="Dashboard">
          <LayoutDashboard className="w-6 h-6" />
        </button>
        <div className="w-px h-6 bg-slate-200" />
        <button 
          onClick={saveReport}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95"
        >
          <Save className="w-5 h-5" />
          <span>Save Draft</span>
        </button>
      </div>

      {/* Print Template (Hidden on screen) */}
      <MonthlyReportPrint data={formData} />

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-template, .print-template * {
            visibility: visible;
          }
          .print-template {
            position: absolute;
            left: 0;
            top: 0;
            display: block !important;
          }
          header, main, footer, .fixed, .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
