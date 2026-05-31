type EventPayload = {
  eventName: string;
  page?: string;
  toolSlug?: string;
  context?: string;
};

type ToolEventPayload = Omit<EventPayload, 'eventName'> & {
  eventName?: string;
};

export const PERSONAL_LOAN_EVENT_NAMES = {
  calculatorStarted: 'personal_loan_calculator_started',
  resultCalculated: 'personal_loan_result_calculated',
  pdfDownloaded: 'personal_loan_pdf_downloaded',
  prepaymentUsed: 'personal_loan_prepayment_used',
  trueCostUsed: 'personal_loan_true_cost_used',
  resultCardDownloaded: 'personal_loan_result_card_downloaded',
} as const;

function logDevEvent(payload: EventPayload) {
  if (process.env.NODE_ENV !== 'development') return;
  // TODO: Replace this no-op logger with a MongoDB Atlas write pipeline when backend events are enabled.
  // Do not include sensitive calculator input values (PAN, Aadhaar, bank details, full financial statements).
  console.info('[RupeeKit event]', payload);
}

export function trackToolEvent(payload: ToolEventPayload) {
  logDevEvent({
    eventName: payload.eventName ?? 'tool_event',
    page: payload.page,
    toolSlug: payload.toolSlug,
    context: payload.context,
  });
}

export function trackPdfDownload(payload: ToolEventPayload) {
  logDevEvent({
    eventName: payload.eventName ?? 'pdf_download',
    page: payload.page,
    toolSlug: payload.toolSlug,
    context: payload.context,
  });
}

export function trackAffiliateClick(payload: ToolEventPayload) {
  logDevEvent({
    eventName: payload.eventName ?? 'affiliate_click',
    page: payload.page,
    toolSlug: payload.toolSlug,
    context: payload.context,
  });
}

export function trackFeedbackSubmission(payload: ToolEventPayload) {
  logDevEvent({
    eventName: payload.eventName ?? 'feedback_submission',
    page: payload.page,
    toolSlug: payload.toolSlug,
    context: payload.context,
  });
}

export function trackPersonalLoanEvent(
  eventName: (typeof PERSONAL_LOAN_EVENT_NAMES)[keyof typeof PERSONAL_LOAN_EVENT_NAMES],
  payload: Omit<ToolEventPayload, 'eventName'> = {}
) {
  logDevEvent({
    eventName,
    page: payload.page,
    toolSlug: payload.toolSlug,
    context: payload.context,
  });
}
