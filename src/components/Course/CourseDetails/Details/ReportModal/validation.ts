import { z } from 'zod';
import toast from 'react-hot-toast';

enum ReportReasons {
  "InappropriateCourseContent" = "Inappropriate Course Content",
  "InappropriateBehavior" = "Inappropriate Behavior",
  "PolicyViolation" = "Policy Violation",
  "SpammyContent" = "Spammy Content",
  "Other" = "Other"
}

const reportCourseSchema = z.object({
  reason: z.nativeEnum(ReportReasons),
  message: z.string().min(10),
});

export function validateReportCourse(data: any) {
  const validation = reportCourseSchema.safeParse(data);
  if (!validation.success) {
    validation.error.issues.forEach((issue: any) => toast.error(`${issue.path.join('.')}: ${issue.message}`));
    return false;
  }
  return true;
}