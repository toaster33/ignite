/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// Fire me up!

module.exports = {
    implements: 'routes/activities',
    inject: ['require(express)', 'services/activities']
};

/**
 * @param express
 * @param {ActivitiesService} activitiesService
 * @returns {Promise}
 */
module.exports.factory = function(express, activitiesService) {
    return new Promise((factoryResolve) => {
        const router = new express.Router();

        // Get user activities.
        router.get('/user/:userId', (req, res) => {
            activitiesService.listByUser(req.params.userId, req.query)
                .then(res.api.ok)
                .catch(res.api.error);
        });

        // Post user activities to page.
        router.post('/page', (req, res) => {
            activitiesService.merge(req.user._id, req.body)
                .then(res.api.ok)
                .catch(res.api.error);
        });

        factoryResolve(router);
    });
};
