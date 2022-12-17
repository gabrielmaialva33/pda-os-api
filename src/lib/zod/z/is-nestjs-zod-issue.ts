import { NestJsZodIssue, ZodIssueOptionalMessage } from './issues';

const CUSTOM_ISSUE_CODE = 'custom';

export function isNestJsZodIssue(
  issue: ZodIssueOptionalMessage,
): issue is NestJsZodIssue {
  return issue.code === CUSTOM_ISSUE_CODE && issue.params?.isNestJsZod;
}
