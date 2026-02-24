import { useState } from 'react';
import { faqData } from '../data/faq';

function FAQ({ items = faqData }) {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 className="section-header__title" id="faq-title">
                        您可能想知道的事
                    </h2>
                    <p className="section-header__desc">
                        找不到答案？歡迎隨時透過即時客服或 Email 聯繫我們的支援團隊。
                    </p>
                </div>

                <ul className="faq__list" role="list">
                    {items.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <li key={item.id} className={`faq__item${isOpen ? ' faq__item--open' : ''}`}>
                                <button
                                    className="faq__trigger"
                                    onClick={() => toggle(item.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            toggle(item.id);
                                        }
                                    }}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${item.id}`}
                                    id={`faq-btn-${item.id}`}
                                >
                                    <span className="faq__question">{item.question}</span>
                                    <span className="faq__icon" aria-hidden="true">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5 7.5L10 12.5L15 7.5"
                                                stroke="currentColor"
                                                strokeWidth="1.75"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </button>

                                <div
                                    className="faq__panel"
                                    id={`faq-panel-${item.id}`}
                                    role="region"
                                    aria-labelledby={`faq-btn-${item.id}`}
                                    hidden={!isOpen}
                                >
                                    <p className="faq__answer">{item.answer}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default FAQ;
