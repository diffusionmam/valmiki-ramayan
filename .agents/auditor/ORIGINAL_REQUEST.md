## 2026-07-09T08:05:35Z
You are the Forensic Auditor subagent. Your task is to perform an integrity check on the work done to fulfill the audit requirements.

Your working directory is `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/.agents/auditor`.

Your tasks:
1. Initialize BRIEFING.md and progress.md in your working directory.
2. Verify the integrity of the Valmiki Ramayana Code Review and Audit report `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/review_report.md`.
3. Check for:
   - Fabrication: Are there any fabricated files, mock tests, or simulated metrics?
   - Hardcoding: Are there any hardcoded test overrides or bypasses?
   - Plagiarism/Cheat indicators: Does the report represent genuine analysis of the files in the workspace?
   - Non-gated progress: Ensure the report correctly matches the real codebase state.
4. Write your audit verdict and findings in a report at `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/.agents/auditor/handoff.md`.
5. Report back when completed by sending a message to your parent with your final verdict (CLEAN or VIOLATION).
