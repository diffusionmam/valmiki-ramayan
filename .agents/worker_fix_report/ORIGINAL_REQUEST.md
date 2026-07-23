## 2026-07-09T08:08:58Z
You are a Worker subagent tasked with updating the Valmiki Ramayana Next.js Code Review and Audit Report at `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/review_report.md`.

Your working directory is `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/.agents/worker_fix_report`.

Your tasks:
1. Initialize BRIEFING.md and progress.md in your working directory.
2. Read the current `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/review_report.md` file.
3. Apply the following corrections to the report's recommendations:

   - **Recommendation 1 (Font Optimization)**:
     - Ensure the Google Noto Serif Devanagari font variable is kept as `--font-heading` (not renamed to `--font-noto`) to avoid breaking the 45+ `font-heading` heading/scripture references in the app.
     - Keep the `@theme inline` block in `globals.css` mapped correctly:
       ```css
       --font-heading: var(--font-heading), "Noto Serif Devanagari", serif;
       --font-sans: var(--font-sans), sans-serif;
       --font-inter: var(--font-sans);
       --font-mono: var(--font-geist-mono), monospace;
       ```
     - Retain other theme variables if any were omitted, or ensure the `@theme inline` block is updated correctly without breaking other components.

   - **Recommendation 2 (Search Modal)**:
     - Restore the original `minisearch` loading, caching, and search logic:
       ```typescript
       let miniSearchInstance: { search: (q: string) => SearchEntry[] } | null = null;
       let loadPromise: Promise<{ search: (q: string) => SearchEntry[] } | null> | null = null;
       ```
       Keep the local caching and lazy-loading promise setup to avoid refetching/reparsing the 3.5MB+ search index on every keystroke.
     - Integrate this `minisearch` logic with the required accessibility improvements: focus trapping, `role="dialog"`, `aria-modal="true"`, `lang="sa"`, and Next.js `useRouter()` navigation (replacing `window.location.href`).

   - **Recommendation 4 (SargaExplorer chapter jump)**:
     - Update the recommended `jumpToChapter()` function to handle both named arcs and the fallback `"Additional Chapters"` group when checking for collapsed groups:
       ```typescript
       const containingGroup = groups.find((g) => g.sargas.some((s) => s.number === n));
       if (containingGroup) {
         const arcName = containingGroup.arc?.name ?? "Additional Chapters";
         if (collapsedArcs.has(arcName)) {
           setCollapsedArcs((prev) => {
             const next = new Set(prev);
             next.delete(arcName);
             return next;
           });
         }
       }
       ```

   - **Recommendation 5 (Reduced Motion & Hydration Warning)**:
     - Resolve the potential Next.js hydration warning by using a `mounted` state in `GalleryLightbox.tsx`. On SSR and initial hydration, render `transition: "none"` so the server output matches the client. Set `mounted` to `true` in a `useEffect` on mount, and only then apply the transition style:
       ```typescript
       const [mounted, setMounted] = useState(false);
       useEffect(() => {
         setMounted(true);
       }, []);
       // ...
       const transitionStyle = mounted && !prefersReducedMotion 
         ? (dragging ? "none" : "transform 0.2s ease-out") 
         : "none";
       ```
     - Provide the minor file diffs showing how to import the central `usePrefersReducedMotion` hook in `ReadingProgress.tsx` and `HeroZoom.tsx` to complete the DRY refactoring.

4. Overwrite `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/review_report.md` with the corrected report.
5. Verify that the files in the workspace still compile and lint successfully if you need to run checking commands.
6. Report back when completed by sending a message to your parent.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
