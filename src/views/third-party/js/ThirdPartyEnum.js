/*
 * Copyright 2020-2021 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import api from '_u/api';

const TARGET_ROUTER = '/thirdPartyLogin?thirdParty=';

export const THIRD_PARTY_ENUM = {
  SDUCAS: 'SDUCAS'
};

export const THIRD_PARTY_CAS = {
  [THIRD_PARTY_ENUM.SDUCAS]: {
    description: 'Shandong University Central Authentication Service',
    targetUrl: function (params) {
      let url = `https://pass.sdu.edu.cn/cas/login?service=${location.origin}${TARGET_ROUTER}${THIRD_PARTY_ENUM.SDUCAS}`;
      for (const k in params) {
        url += `&${k}=${params[k]}`;
      }
      return url;
    },
    certificate: function (params) {
      return new Promise((resolve, reject) => {
        api.thirdPartyLogin(params).then(ret => {
          resolve(ret);
        }).catch(reject);
      });
    },
    render: function (h, params) {
      const tip1 = `${params.sduRealName}(${params.sduId}) has passed SDU CAS certification`;
      const tip2 = 'Please complete the following information';
      const span1 = h('div', { class: { center: true }, style: { color: '#000000A6' } }, tip1);
      const span2 = h('div', { class: { center: true }, style: { color: '#000000A6' } }, tip2);
      return h('div', [span1, span2]);
    }
  }
};
