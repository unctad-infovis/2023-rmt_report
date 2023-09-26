import React, { /* useState,  useEffect, useRef */ } from 'react';

function Footer() {
  return (
    <div className="app" id="app_footer">
      <div className="footer_container">
        <h2>What do you want to do next?</h2>
        <div className="footer_elements">
          <div className="footer_element footer_element_1">
            <div className="footer_content anchor_videos" id="anchor_videos">
              <h3 className="hidden">Watch the videos</h3>
              <div className="iframe_container youtube_iframe hidden">
                <iframe src="https://www.youtube.com/embed/duZBRPcX9mo" title="Wold Investment Report" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <ul className="hidden">
                <li>
                  <a href="https://youtu.be/sNY2fjq2E1w" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="https://youtu.be/Yvzl8Pt9Ju8" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="https://youtu.be/XE3zpBBfdHk" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="https://youtu.be/H0p9rAsqwe4" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="https://youtu.be/UsmSbdv4JIU" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="https://youtu.be/ek-p4Hl7Pak" target="_blank" rel="noreferrer">Português</a>
                  {', '}
                  <a href="https://youtu.be/t-rzyvDCdkE" target="_blank" rel="noreferrer">Kiswahili</a>
                </li>
              </ul>
              <h4 className="hidden">Download the report video</h4>
              <ul className="hidden">
                <li>
                  <a href="https://vimeo.com/842219310" target="_blank" rel="noreferrer">English</a>
                  {', '}
                  <a href="https://vimeo.com/842219331" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="https://vimeo.com/842219459" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="https://vimeo.com/842219226" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="https://vimeo.com/842219277" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="https://vimeo.com/842219430" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="https://vimeo.com/842219402" target="_blank" rel="noreferrer">Português</a>
                  {', '}
                  <a href="https://vimeo.com/842219366" target="_blank" rel="noreferrer">Kiswahili</a>
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
