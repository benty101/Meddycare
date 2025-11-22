import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

const FAQSection = React.forwardRef<HTMLDivElement, FAQSectionProps>(
  ({ title, subtitle, faqs, className }, ref) => {
    return (
      <section ref={ref} className={className}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          {(title || subtitle) && (
            <div className="text-center mb-16">
              {title && (
                <h2 className="heading-lg text-center mb-4">
                  {title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "text-(--brand-purple)" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>
              )}
              {subtitle && (
                <p className="body-lg text-gray-600">{subtitle}</p>
              )}
            </div>
          )}

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl px-6 border-2 border-gray-100 hover:border-(--brand-purple) transition-colors"
              >
                <AccordionTrigger className="heading-xs text-(--brand-purple) hover:no-underline py-6 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="body-md text-gray-600 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="body-md text-gray-600 mb-4">
              Still have questions?
            </p>
            <a
              href="/contact"
              className="btn-primary inline-block"
            >
              Contact Our Care Advisors
            </a>
          </div>
        </div>
      </section>
    );
  }
);

FAQSection.displayName = "FAQSection";

export { FAQSection };