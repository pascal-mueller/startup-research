import type { ComponentType } from 'react'

export interface PageMeta {
  title: string
  nav?: string
  summary?: string
  order?: number
  related?: string[]
  subtopics?: string[]
  cluster?: string
  hidden?: boolean
}

export interface Page {
  path: string
  section: string
  slug: string
  meta: PageMeta
  Component: ComponentType
  raw: string
}

export type SizeKey = 'startup' | 'sme' | 'midmarket' | 'multinational'

export interface WorkflowStep {
  title: string
  who?: string
  where?: string
  when?: string
  detail: string
  judgment?: string
  manual?: string
}

export interface Workflow {
  id: string
  title: string
  question: string
  group: string
  order?: number
  summary: string
  objective: string
  trigger: string
  frequency: string
  people: { role: string; does: string }[]
  systems: { name: string; use: string }[]
  data: { name: string; source: string; notes?: string }[]
  steps: WorkflowStep[]
  judgment: { decision: string; why: string }[]
  failure_modes: { mode: string; consequence: string; detection?: string }[]
  software: string
  manual_work: string[]
  by_size: Partial<Record<SizeKey, string>>
  companies?: Partial<Record<string, string>>
  example?: { title: string; body: string }
  handoffs?: { from: string; gives: string; to: string; note?: string }[]
  interview?: string
  ai_note?: string
  terms?: string[]
  related?: string[]
  sources?: string[]
  evidence_note?: string
}

export interface Term {
  id: string
  term: string
  aka?: string[]
  category: string
  plain: string
  professional: string
  example: string
  related?: string[]
  confusedWith?: string
}

export interface Source {
  id: string
  title: string
  publisher: string
  year?: number | string
  url?: string
  type: 'survey' | 'official' | 'standard' | 'vendor' | 'practitioner' | 'news' | 'filing' | 'academic'
  note?: string
  accessed?: string
}

export interface Company {
  id: string
  name: string
  tagline: string
  size: SizeKey
  facts: { label: string; value: string }[]
  profile: string
  path?: string
}

export interface CompareTopic {
  id: string
  title: string
  question: string
  cells: Partial<Record<string, string>>
  takeaway?: string
}

export interface CalendarEntry {
  time: string
  activity: string
  why: string
  system?: string
  info?: string
  decision?: string
  with?: string
}

export interface RoleCalendar {
  title: string
  context: string
  entries: CalendarEntry[]
}

export interface Role {
  id: string
  title: string
  aka?: string[]
  family: 'leadership' | 'treasury' | 'finance' | 'business'
  oneLiner: string
  reportsTo?: string
  exists: Partial<Record<SizeKey, string>>
  owns?: string[]
  escalates?: string
  knows: { best: string[]; some: string[]; not: string[] }
  vocabulary?: string[]
  page?: string
  calendars?: RoleCalendar[]
}

export interface OrgNode {
  title: string
  who?: string
  note?: string
  kind?: 'treasury' | 'finance' | 'exec' | 'business' | 'external'
  dotted?: boolean
  children?: OrgNode[]
}

export interface OrgExample {
  id: string
  title: string
  company?: string
  size: SizeKey
  summary: string
  tree: OrgNode
  notes?: string[]
  whoDoesWhat?: { task: string; who: string }[]
}

export type RaciCode = 'O' | 'P' | 'D' | 'A' | 'I'
export interface RaciMatrix {
  size: SizeKey
  label: string
  company?: string
  columns: { id: string; label: string }[]
  rows: { task: string; workflow?: string; cells: Record<string, string>; note?: string }[]
}

export interface InterviewTopic {
  id: string
  title: string
  workflows?: string[]
  best: { role: string; why: string }[]
  also?: { role: string; why: string }[]
  less: { role: string; why: string }[]
  sizeNote?: string
  openers?: string[]
}
