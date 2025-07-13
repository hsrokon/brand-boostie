import { useLocation } from 'react-router-dom';

const FAQ = () => {
  const location = useLocation();

  const serviceFAQs = [
    {
      question: 'How long before I see results?',
      answer:
        'Results depend on your service, but many clients begin to notice improvements within the first month.',
    },
    {
      question: 'Do you work with small businesses?',
      answer:
        'Yes! We specialize in helping small to mid-sized businesses scale effectively.',
    },
    {
      question: 'Can I customize my service package?',
      answer:
        'Absolutely. We offer flexible packages to meet your unique business needs.',
    },
  ];

  const aboutFAQs = [
    {
      question: 'What does BrandBoostie do?',
      answer:
        'We’re a digital marketing team helping businesses grow online. From ads campaigns and local SEO to websites and email marketing, we create custom strategies to fit your goals.',
    },
    {
      question: 'Who do you work with?',
      answer:
        'We work with startups, small businesses, and established brands worldwide. Whether you’re a local shop or an online store, we tailor our services to meet your needs.',
    },
    {
      question: 'Where is BrandBoostie based?',
      answer:
        'We’re proudly based in [your city/country], but our team and clients come from all over the world. We collaborate remotely to bring you the best results.',
    },
    {
      question: 'How long have you been in business?',
      answer:
        'We’ve been helping businesses succeed online since 2020 and continue to grow with every new project.',
    },
    {
      question: 'What makes BrandBoostie different?',
      answer:
        'We believe in results and relationships. Our strategies are data-driven and personalized, and we keep communication clear and honest every step of the way.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Just reach out! Book a free consultation through our contact page. We’ll talk about your goals and see how we can help.',
    },
  ];

  const faqsToShow = location.pathname === '/about' ? aboutFAQs : serviceFAQs;

  return (
    <div
      className={`w-10/12 md:w-8/12 lg:w-6/12 mx-auto ${location.pathname==='/about' ? 'mb-24' : ''} mt-16 `}
      data-aos="fade-up"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqsToShow.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-plus bg-base-100 border border-accent/60"
          >
            <input
              type="radio"
              name="faq-accordion"
              defaultChecked={index === 0}
            />
            <div className="collapse-title font-semibold text-accent lg:text-xl">
              {faq.question}
            </div>
            <div className="collapse-content text-sm lg:text-base text-base-content">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;