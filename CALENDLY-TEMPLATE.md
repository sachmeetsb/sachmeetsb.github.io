# Calendly template update — awaiting account sign-in

## Booking verification — 10 September 2026

- Reproduced the new-tab handoff not opening in the Codex in-app browser. Changed the website link to ordinary same-tab navigation; verified the patched form reaches the real Calendly calendar and attendee form.
- Verified synthetic name, email and complete preparation brief are prefilled in Calendly's attendee form. Stopped before **Schedule Event**: no appointment or invitation was created.
- Removed the misleading microphone-stopped status during typed-only booking. All 18 startup, voice and website regression tests pass; production build passes.
- Live account configuration still needs correction: the public event remains **Discovery and Initiative**, only 30 minutes, weekdays 9am–5pm IST, Saturdays unavailable. At approximately 2:31pm IST on 10 September it offered 9am on 11 September, violating the requested 24-hour notice.
- Google sign-in for sachmeet@kartar.ai is required to edit the event. Connected calendar, conflict checking, 15-minute buffer, one-hour event, actual invitation, meeting link, rescheduling and cancellation remain unverified. Do not describe this as completed end-to-end booking.
- Release rollback: revert only the booking-fix commit if the same-tab handoff fails on production; preceding main is `156b04b4bb16eb8128af7368478545ee2473d4bf`. No database or backend changes are included.

Inspected the public event on 9 September 2026. No event was booked or submitted.

Current verified URL: https://calendly.com/sachmeet-kartar/30min

Current title: Discovery and Initiative. Public description contains old agency-style copy and a spelling error. The inspected calendar offered 9am–5pm weekday times, including same-day availability; Saturdays were unavailable. Connected calendar and buffer settings cannot be verified from the public booking page.

## Requested account-side changes

- Title: Product Discovery with Sachmeet.
- Description: “Bring a product idea, an existing app or a workflow you want to improve. We’ll discuss who it serves, the current constraints and what a useful next step looks like. Share a short brief below so I can prepare. For questions, email sachmeet@kartar.ai.”
- Calendar: sachmeet@kartar.ai; verify conflict checking and event destination in the account.
- Availability: Monday–Saturday, 12:00–20:00, Asia/Kolkata.
- Minimum notice: 24 hours. Buffer: 15 minutes between calls.
- Offer 30-minute and 60-minute options. Do not advertise or invent the 60-minute event URL until configured and tested.
- Retain the existing first custom textarea (`a1`) for the full preparation brief. Suggested label: “Project brief — what would make this conversation useful?”
- Verify meeting location, confirmation email, calendar invitation and cancellation/rescheduling links with an approved test attendee before claiming end-to-end completion.

## Website-side handoff

The form collects 13 labelled controls, with name, email, discussion and outcome required. Remaining fields are optional. A reviewed, complete brief is passed into `a1`, with name/email passed separately. There is no preliminary EmailJS send, fake booking confirmation or stale saved booking link. Changes to any field invalidate the prepared handoff.

Calendly documents this mapping at https://help.calendly.com/hc/en-us/articles/226766767-Pre-populate-invitee-information-in-the-booking-process and https://developer.calendly.com/api-docs/overview/embedding/recipes . The live event was inspected to verify its first custom field; account-side edits have not been made.
