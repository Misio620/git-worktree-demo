import { useCookieConsent } from '../hooks/useCookieConsent';
import './CookieConsent.css';

function CookieConsent() {
    const { visible, animateOut, accept, reject } = useCookieConsent();

    if (!visible) return null;

    return (
        <div className={`cookie-banner ${animateOut ? 'cookie-banner--out' : 'cookie-banner--in'}`}>
            <div className="cookie-banner__content">
                <div className="cookie-banner__text">
                    <p>
                        我們使用 Cookie 來提升您的瀏覽體驗、分析網站流量。
                        詳情請參閱我們的{' '}
                        <a href="#" className="cookie-banner__link">
                            隱私政策
                        </a>
                        。
                    </p>
                </div>
                <div className="cookie-banner__actions">
                    <button className="cookie-banner__btn cookie-banner__btn--secondary" onClick={reject}>
                        僅必要 Cookie
                    </button>
                    <button className="cookie-banner__btn cookie-banner__btn--primary" onClick={accept}>
                        接受所有 Cookie
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieConsent;
