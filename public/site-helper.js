/**
 * 页面提示卡片、关键词徽章和访问说明生成器
 * 适用于 GitHub Pages / 静态站点
 * 无第三方依赖
 */
(function () {
  'use strict';

  // ---------- 配置数据 ----------
  const CONFIG = {
    siteUrl: 'https://mainsite-hth.com.cn',
    keyword: '华体会',
    cardTitle: '站点提示',
    badgePrefix: '关键',
    visitLabel: '访问方式'
  };

  // ---------- 示例数据 ----------
  const samples = [
    { name: '华体会体育', type: '运动' },
    { name: '华体会电竞', type: '竞技' },
    { name: '华体会娱乐', type: '休闲' }
  ];

  // ---------- 工具函数 ----------
  function createElement(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === 'className') {
          el.className = attrs[key];
        } else if (key === 'style') {
          Object.assign(el.style, attrs[key]);
        } else {
          el.setAttribute(key, attrs[key]);
        }
      });
    }
    if (children) {
      children.forEach(function (child) {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else {
          el.appendChild(child);
        }
      });
    }
    return el;
  }

  // ---------- 卡片生成 ----------
  function buildCard() {
    const container = createElement('div', {
      className: 'site-helper-card',
      style: {
        border: '1px solid #d0d0d0',
        borderRadius: '8px',
        padding: '16px',
        margin: '12px 0',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6'
      }
    });

    // 标题
    const title = createElement('h3', {
      style: { margin: '0 0 10px 0', color: '#333' }
    }, [CONFIG.cardTitle]);
    container.appendChild(title);

    // 说明段落
    const desc = createElement('p', {
      style: { margin: '0 0 12px 0', color: '#555' }
    }, [
      '本页面关于 ',
      createElement('strong', null, [CONFIG.keyword]),
      ' 的资源汇总。官方站点：',
      createElement('a', {
        href: CONFIG.siteUrl,
        target: '_blank',
        style: { color: '#1a73e8', textDecoration: 'none' }
      }, [CONFIG.siteUrl])
    ]);
    container.appendChild(desc);

    // 访问说明
    const visitBox = createElement('div', {
      style: {
        backgroundColor: '#eef',
        padding: '8px 12px',
        borderRadius: '6px',
        marginBottom: '14px',
        fontSize: '0.95em'
      }
    }, [
      createElement('strong', null, [CONFIG.visitLabel + '：']),
      '推荐使用主流浏览器直接访问上述链接，无需额外工具。'
    ]);
    container.appendChild(visitBox);

    return container;
  }

  // ---------- 徽章生成 ----------
  function buildBadges() {
    const badgeContainer = createElement('div', {
      className: 'keyword-badges',
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        margin: '10px 0'
      }
    });

    // 从示例数据生成徽章
    samples.forEach(function (item) {
      const badge = createElement('span', {
        className: 'badge-item',
        style: {
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: '12px',
          backgroundColor: '#e0e7ff',
          color: '#1e3a5f',
          fontSize: '0.85em',
          border: '1px solid #b0c4de'
        }
      }, [item.name]);
      badgeContainer.appendChild(badge);
    });

    // 额外关键词徽章
    const extra = createElement('span', {
      style: {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '12px',
        backgroundColor: '#fff3cd',
        color: '#856404',
        fontSize: '0.85em',
        border: '1px solid #ffc107'
      }
    }, [CONFIG.badgePrefix + '·' + CONFIG.keyword]);
    badgeContainer.appendChild(extra);

    return badgeContainer;
  }

  // ---------- 主渲染函数 ----------
  function render() {
    // 避免重复添加
    if (document.querySelector('.site-helper-card')) return;

    // 定位插入点：优先 body 末尾，或特定容器
    var target = document.querySelector('#site-helper-area') || document.body;

    var wrapper = createElement('div', {
      className: 'site-helper-wrapper',
      style: { maxWidth: '600px', margin: '20px auto' }
    });

    wrapper.appendChild(buildCard());
    wrapper.appendChild(buildBadges());

    // 附加示例列表
    var list = createElement('ul', {
      style: {
        margin: '12px 0 0 0',
        paddingLeft: '20px',
        color: '#444',
        fontSize: '0.9em'
      }
    });
    samples.forEach(function (item) {
      var li = createElement('li', null, [
        item.name + ' (' + item.type + ')'
      ]);
      list.appendChild(li);
    });
    wrapper.appendChild(list);

    target.appendChild(wrapper);
  }

  // ---------- 启动 ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();