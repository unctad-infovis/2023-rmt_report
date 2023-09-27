import React, { /* useState,  useEffect, useRef */ } from 'react';

function Footer() {
  return (
    <div className="app" id="app_footer">
      <div className="footer_container">
        <h2>What do you want to do next?</h2>
        <div className="footer_elements">
          <div className="footer_element footer_element_1">
            <div className="footer_content anchor_videos" id="anchor_videos">
              <h3>Watch the videos</h3>
              <div className="iframe_container youtube_iframe">
                <iframe src="https://www.youtube.com/embed/NRFEuRqoR7U" title="Wold Investment Report" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <ul>
                <li>
                  <a href="https://youtu.be/xMTaiLRO8fM" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="https://youtu.be/OIxBxLvDL0Y" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="https://youtu.be/A5mIjaECTBc" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="https://youtu.be/DskeZaWUiCA" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="https://youtu.be/00iFOntZxG0" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="https://youtu.be/0EN3au-p81M" target="_blank" rel="noreferrer">Português</a>
                  {', '}
                  <a href="https://youtu.be/4OOyOL0uGnQ" target="_blank" rel="noreferrer">Kiswahili</a>
                </li>
              </ul>
              <h4>Download the report video</h4>
              <ul>
                <li>
                  <a href="https://vimeo.com/868447138" target="_blank" rel="noreferrer">English</a>
                  {', '}
                  <a href="https://vimeo.com/868447431" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="https://vimeo.com/868447676" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="https://vimeo.com/868447013" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="https://vimeo.com/868447067" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="https://vimeo.com/868447615" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="https://vimeo.com/868447562" target="_blank" rel="noreferrer">Português</a>
                  {', '}
                  <a href="https://vimeo.com/868447493" target="_blank" rel="noreferrer">Kiswahili</a>
                </li>
              </ul>
              <h4 className="hidden">Watch the press conference</h4>
              <div className="iframe_container youtube_iframe hidden">
                <iframe src="https://www.youtube.com/embed/rUR6isHC8MI" title="Wold Investment Report Press Conference" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
            <div className="footer_content anchor_podcasts" id="anchor_podcasts">
              <h3>Podcasts</h3>
              <p>Listen to the Weekly Tradecast episodes that explore some of the main issues in the report</p>
              <div className="iframe_container">
                <iframe title="The Weekly Tradecast by UNCTAD" height="150" width="100%" style={{ border: 'none', minWidth: 'min(100%, 430px)' }} scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=qxwhi-14b3a52-pb&btn-skin=009EDB&download=1&font-color=000000&fonts=Verdana&from=pb6admin&logo_link=none&rtl=0&share=1&size=240&skin=ffffff" allowFullScreen />
                <span className="text"><a href="/podcast/charting-course-shipping-industry-must-balance-uncertainty-investment-and-environment">Shipping industry must balance uncertainty, investment and the environment</a></span>
              </div>
              {/* <ul className="podcasts_container">
                <li>
                  <span className="icon" />
                  <span className="text"><a href="/podcast/not-fantastic-when-its-plastic-stemming-tide-ocean-rubbish">Not fantastic when it’s plastic</a></span>
                </li>
                <li>
                  <span className="icon" />
                  <span className="text"><a href="/podcast/sea-trouble-turning-our-ships-green">Sea of trouble</a></span>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
