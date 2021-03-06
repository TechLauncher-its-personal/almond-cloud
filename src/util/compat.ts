// -*- mode: typescript; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// This file is part of Almond
//
// Copyright 2020 The Board of Trustees of the Leland Stanford Junior University
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Author: Giovanni Campagna <gcampagn@cs.stanford.edu>

import * as ThingTalk from 'thingtalk';

export function parseOldOrNewSyntax(code : string, options : { locale : string, timezone : string }) {
    try {
        return ThingTalk.Syntax.parse(code, ThingTalk.Syntax.SyntaxType.Normal, options);
    } catch(e1) {
        if (e1.name !== 'SyntaxError')
            throw e1;
        try {
            return ThingTalk.Syntax.parse(code, ThingTalk.Syntax.SyntaxType.Legacy, options);
        } catch(e2) {
            if (e2.name !== 'SyntaxError')
                throw e2;
            throw e1;
        }
    }
}
