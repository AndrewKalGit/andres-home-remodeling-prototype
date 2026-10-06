// === CRO_DECISION_START: AnnouncementBar - Name the offer before the navigation ===
// A specific audience, a specific reward, and a time frame give the banner a
// job. Linking it straight to the estimate lets a motivated visitor skip the
// menu and start the only action the offer exists to create.
export function AnnouncementBar({ message }: { message: string }) {
  return (
    <a
      id="announcement"
      href="#instant-estimate"
      className="block bg-ink px-4 py-3 text-center text-[13px] font-medium leading-snug tracking-[0.04em] text-cream transition duration-150 hover:bg-forest sm:text-sm"
    >
      {message}
    </a>
  );
}
// === CRO_DECISION_END: AnnouncementBar ===
