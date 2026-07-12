import type { ReactNode } from 'react'

export const REPO_URL = 'https://github.com/1hanif/nativemailer'
export const REPO_API = 'https://api.github.com/repos/1hanif/nativemailer'

export interface Email {
  from: string
  subject: string
  tag: string
  color: string
}

export const INCOMING: Email[] = [
  { from: 'orders@shop.test', subject: 'Order #1042 confirmed', tag: 'HTML', color: '#e3b341' },
  { from: 'noreply@app.test', subject: 'Verify your email address', tag: 'HTML', color: '#fdae4b' },
  { from: 'billing@saas.test', subject: 'Your invoice for July', tag: 'PDF', color: '#38bdf8' },
  { from: 'support@app.test', subject: 'Password reset requested', tag: 'TEXT', color: '#a3e635' },
  { from: 'team@startup.test', subject: 'Welcome aboard, Hanif!', tag: 'HTML', color: '#f472b6' },
]

export const STACKS: string[] = ['Laravel', 'Symfony', 'Rails', 'Django', 'Express', 'Phoenix']

export interface Step {
  n: string
  title: string
  desc: ReactNode
}

export const HEADERS: [string, string][] = [
  ['Return-Path', '<bounce@nativemailer.test>'],
  ['Received', 'from localhost [127.0.0.1]:1025'],
  ['Message-ID', '<a1b2c3d4@nativemailer.test>'],
  ['X-Mailer', 'Native Mailer v2.4.0'],
  ['DKIM-Signature', 'v=1; a=rsa-sha256; d=app.test'],
  ['Content-Type', 'multipart/alternative'],
  ['Subject', 'Order #1042 confirmed'],
]

export interface AttachmentFile {
  name: string
  size: string
  kind: string
  color: string
}

export const ATTACHMENTS: AttachmentFile[] = [
  { name: 'invoice-1042.pdf', size: '182 KB', kind: 'PDF', color: '#e3b341' },
  { name: 'receipt-photo.png', size: '2.4 MB', kind: 'IMG', color: '#38bdf8' },
  { name: 'terms.docx', size: '96 KB', kind: 'DOC', color: '#a3e635' },
]
