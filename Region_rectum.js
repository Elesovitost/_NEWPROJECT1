const RegionRectum = {
    title: 'Rektum a mezorektum',
    reportLayout: 'block',
    layout: (helpers) => {
        let layoutNodes = [];

        // --- 1. PRIMÁRNÍ TUMOR (LÉZE) ---
        const lesInsts = Store.instances?.['rectum_lesion_main'] || [];
        lesInsts.forEach((instId, idx) => {
            const p = `rt_${instId}`;
            
            const locRows = [
                helpers.Table1col(`${p}_loc1`, [['Od AR úhlu:', { field: 'mm', id: `${p}_dist`, placeholder: 'cm' }, 'Délka:', { field: 'mm', id: `${p}_len`, placeholder: 'cm' }, 'Rozsah:', { field: 'mm', id: `${p}_c_od`, placeholder: 'od' }, { field: 'mm', id: `${p}_c_do`, placeholder: 'do' }]], 'rectum'),
                helpers.Table1col(`${p}_loc2`, [['Invaze:', { btn: `${p}_inv`, states: ['0', '< 1 mm', '1-5 mm', '5-15 mm', '> 15 mm', 'perit. recesu', 'orgánu'] }, 'Kde:', { field: 'text', id: `${p}_inv_kde`, placeholder: 'upřesnění...' }]], 'rectum'),
                helpers.Table1col(`${p}_loc3`, [['Invaze MRF:', { btn: `${p}_mrf`, states: ['0', '+'] }, 'EMVI:', { btn: `${p}_emvi`, states: ['0', '+'] }, 'Tumor depozita:', { btn: `${p}_td`, states: ['0', '+', '++'] }]], 'rectum'),
                helpers.Table1col(`${p}_loc4`, [['Invaze dna:', { btn: `${p}_dno`, states: ['0', '+'] }, 'Invaze sfinkteru:', { btn: `${p}_sfinkter`, states: ['0', 'interní', 'intersfinkter.', 'externí'] }]], 'rectum'),
                el('div', { style: 'height: 12px;' }),
                el('div', { className: 'sub-table-title', textContent: 'Po terapii', style: 'text-align: left; padding-left: 8px;' }),
                helpers.Table1col(`${p}_loc5`, [['Response:', { btn: `${p}_terapie`, states: ['0', '(near) complete', 'malé reziduum', 'velké reziduum'] }]], 'rectum')
            ];

            layoutNodes.push(
                helpers.LesionMain(`rectum_lesion_main__${instId}`, `Léze rekta (${idx + 1})`, [
                    ...LESIONS_DEFINITION.getLesionRowsPre(helpers, p),
                    ...locRows,
                    ...LESIONS_DEFINITION.getLesionRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                ])
            );
        });

        // --- 2. UZLINY ---
        const lnInsts = Store.instances?.['rectum_lymphnode_main'] || [];
        lnInsts.forEach((instId, idx) => {
            const p = `rtln_${instId}`;
            layoutNodes.push(
                helpers.LesionMain(`rectum_lymphnode_main__${instId}`, `Lymfadenopatie (${idx + 1})`, [
                    ...LESIONS_DEFINITION.getLymphNodeRowsPre(helpers, p),
                    helpers.Table3colRCL(`${p}_loc1`, 'Lokalizace', [
                        [ '', { btn: `${p}_p_ima_c`, type: 'basic', text: 'IMA + RS' }, '' ],
                        [ '', [ { btn: `${p}_p_par_r`, type: 'basic', text: 'para-Ao' }, { btn: `${p}_p_par_l`, type: 'basic', text: 'para-Ao' } ], '' ],
                        [ { btn: `${p}_p_cia_r`, type: 'basic', text: 'CIA' }, '', { btn: `${p}_p_cia_l`, type: 'basic', text: 'CIA' } ],
                        [ { btn: `${p}_p_eia_r`, type: 'basic', text: 'EIA' }, '', { btn: `${p}_p_eia_l`, type: 'basic', text: 'EIA' } ],
                        [ { btn: `${p}_p_iia_r`, type: 'basic', text: 'IIA' }, '', { btn: `${p}_p_iia_l`, type: 'basic', text: 'IIA' } ],
                        [ { btn: `${p}_p_obt_r`, type: 'basic', text: 'obturátor' }, '', { btn: `${p}_p_obt_l`, type: 'basic', text: 'obturátor' } ],
                        [ '', [ { btn: `${p}_p_pre_r`, type: 'basic', text: 'presakr.' }, { btn: `${p}_p_pre_l`, type: 'basic', text: 'presakr.' } ], '' ],
                        [ '', [ { btn: `${p}_p_mez_r`, type: 'basic', text: 'mezorekt.' }, { btn: `${p}_p_mez_l`, type: 'basic', text: 'mezorekt.' } ], '' ],
                        [ { btn: `${p}_p_ing_r`, type: 'basic', text: 'inguinálně' }, '', { btn: `${p}_p_ing_l`, type: 'basic', text: 'inguinálně' } ]
                    ], 'rectum'),
                    ...LESIONS_DEFINITION.getLymphNodeRowsPost(helpers, p, `${p}_met`, `${p}_e`)
                ])
            );
        });

        return layoutNodes;
    },
    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Rektum a mezorektum:', action: 'open-region', regionId: 'rectum' }];
        let concMain = [];
        let concInc = [];
        
        const isPet = ctx.examId.toLowerCase().includes('pet');

        // --- 1. PRIMÁRNÍ TUMOR (LÉZE) ---
        const lesInsts = Store.instances?.['rectum_lesion_main'] || [];
        
        if (lesInsts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Stěna rekta je bez zjevného patologického ztluštění, mezorektum čisté.', tableId: 'rectum_lesion_main', dimmed: true });
        } else {
            lesInsts.forEach((instId) => {
                const p = `rt_${instId}`;
                let dL = LESIONS_DEFINITION.parseDetails(ctx, ctx.examId, 'rectum', p, `${p}_met`, `${p}_e`, false);
                
                let dist = ctx.field(`${p}_dist`);
                let len = ctx.field(`${p}_len`);
                let cOd = ctx.field(`${p}_c_od`);
                let cDo = ctx.field(`${p}_c_do`);
                
                let locParts = [];
                if (dist) locParts.push(`ve vzdálenosti cca ${dist} cm od AR úhlu`);
                if (len) locParts.push(`v délce ${len} cm`);
                if (cOd && cDo) locParts.push(`cirkumferenčně v rozsahu od ${cOd} do ${cDo} č.`);
                let locStr = locParts.length > 0 ? ` ${locParts.join(', ')}` : '';

                let inv = ctx.text(`${p}_inv`);
                let invKde = ctx.field(`${p}_inv_kde`);
                let stageStr = "T1/T2";
                let stageDesc = "";
                let kdeSuffix = invKde ? `, lokalizace: ${invKde}` : "";

                if (inv) {
                    if (inv === '< 1 mm') { stageStr = "T3a"; stageDesc = `Extramurální hloubka invaze do 1 mm (odpovídá stadiu v.s. T3a)${kdeSuffix}.`; }
                    else if (inv === '1-5 mm') { stageStr = "T3b"; stageDesc = `Extramurální hloubka invaze 1-5 mm (odpovídá stadiu v.s. T3b)${kdeSuffix}.`; }
                    else if (inv === '5-15 mm') { stageStr = "T3c"; stageDesc = `Extramurální hloubka invaze 5-15 mm (odpovídá stadiu v.s. T3c)${kdeSuffix}.`; }
                    else if (inv === '> 15 mm') { stageStr = "T3d"; stageDesc = `Extramurální hloubka invaze nad 15 mm (odpovídá stadiu v.s. T3d)${kdeSuffix}.`; }
                    else if (inv === 'perit. recesu') { stageStr = "T4a"; stageDesc = `Infiltrace peritoneální reflexe (odpovídá stadiu v.s. T4a)${kdeSuffix}.`; }
                    else if (inv === 'orgánu') { stageStr = "T4b"; stageDesc = `Infiltrace okolních orgánů (odpovídá stadiu v.s. T4b)${kdeSuffix}.`; }
                }

                let riskParts = [];
                let mrf = ctx.text(`${p}_mrf`);
                let emvi = ctx.text(`${p}_emvi`);
                let td = ctx.text(`${p}_td`);
                
                let mrfStr = mrf === '+' ? "MRF+" : "MRF-";
                let emviStr = emvi === '+' ? "EMVI+" : "EMVI-";
                let mrfDesc = mrf === '+' ? "Fascie mezorekta (MRF) je infiltrována (vzdálenost tumoru ≤ 1 mm)." : "Fascie mezorekta (MRF) bez známek invaze (vzdálenost > 1 mm).";
                let emviDesc = emvi === '+' ? "Přítomna extramurální vaskulární invaze (EMVI pozitivní)." : "";
                
                let tdDesc = "";
                if (td === '+') { tdDesc = "V mezorektu přítomna tumorózní depozita (TD)."; riskParts.push("TD+"); }
                else if (td === '++') { tdDesc = "V mezorektu přítomna vícečetná tumorózní depozita (TD)."; riskParts.push("TD+ (vícečetná)"); }

                let dno = ctx.text(`${p}_dno`);
                let sfinkter = ctx.text(`${p}_sfinkter`);
                let dnoDesc = dno === '+' ? "Zřetelná invaze tumoru do pánevního dna." : "";
                let sfinDesc = "";
                if (sfinkter && sfinkter !== '0') {
                    if (sfinkter === 'interní') sfinDesc = "Tumor infiltruje interní sfinkter.";
                    if (sfinkter === 'intersfinkter.') sfinDesc = "Tumor se šíří do intersfinkterického prostoru.";
                    if (sfinkter === 'externí') sfinDesc = "Tumor infiltruje externí sfinkter.";
                }

                let terapie = ctx.text(`${p}_terapie`);
                let terStr = "";
                if (terapie) {
                    if (terapie === '(near) complete') terStr = "Dle MR (téměř) kompletní odpověď na terapii (odpovídá TRG 1-2).";
                    if (terapie === 'malé reziduum') terStr = "Dle MR částečná odpověď, trvá malé tumorózní reziduum.";
                    if (terapie === 'velké reziduum') terStr = "Dle MR stacionární nález, trvá velké tumorózní reziduum.";
                }

                // Sestavení Reportu
                let repBase = `${dL.baseText}${locStr}${dL.vzhledText}${dL.metrikyStr}${dL.actStr}${dL.dynStr}${dL.doplneniStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                let repDetails = [stageDesc, mrfDesc, emviDesc, tdDesc, dnoDesc, sfinDesc, terStr].filter(Boolean).join(' ');
                if (dL.etioStr) repDetails += ` ${dL.etioStr}.`;
                
                reportOut.push({ type: 'frame', text: `${repBase} ${repDetails}`.trim(), tableId: `rectum_lesion_main__${instId}` });

                // Sestavení Závěru
                let stageArr = [stageStr, mrfStr, emviStr].filter(Boolean).join(', ');
                let extRisk = riskParts.length > 0 ? ` (${riskParts.join(', ')})` : "";
                let dnoSfin = (dno === '+' || (sfinkter && sfinkter !== '0')) ? "s invazí dna/sfinkteru" : "";
                
                let isTumor = repBase.toLowerCase().includes('tumor') || repBase.toLowerCase().includes('karcinom') || repBase.toLowerCase().includes('maligní');
                let baseLabel = isTumor ? "Karcinom rekta" : dL.baseText;

                let cParts = [];
                cParts.push(`${baseLabel} ${dist ? '('+dist+' cm od AR úhlu)' : ''}`);
                if (dnoSfin) cParts.push(dnoSfin);
                cParts.push(`- lokální staging v.s. ${stageArr}${extRisk}.`);
                if (terStr) cParts.push(terStr);

                concMain.push({ type: 'frame', text: cParts.join(' ').replace('  ', ' ').trim(), tableId: `rectum_lesion_main__${instId}` });
            });
        }

        // --- 2. UZLINY ---
        const lnInsts = Store.instances?.['rectum_lymphnode_main'] || [];
        if (lnInsts.length === 0) {
            reportOut.push({ type: 'frame', text: isPet ? 'Bez patrné hyperakumulující lymfadenopatie.' : 'Bez zjevné patologické regionální či non-regionální lymfadenopatie.', tableId: 'rectum_lymphnode_main', dimmed: true });
        } else {
            lnInsts.forEach(instId => {
                const p = `rtln_${instId}`;
                let lokaceLN = [];
                
                if (ctx.isActive(`${p}_p_ima_c`)) lokaceLN.push('podél a. mesenterica inf. (IMA) / a. rectalis sup. (RS)');

                const noBilatNodes = [
                    { id: 'par', name: 'paraaortálně' },
                    { id: 'pre', name: 'presakrálně' },
                    { id: 'mez', name: 'mezorektálně' }
                ];

                noBilatNodes.forEach(reg => {
                    let r = ctx.isActive(`${p}_p_${reg.id}_r`);
                    let l = ctx.isActive(`${p}_p_${reg.id}_l`);
                    if (r && l) lokaceLN.push(`${reg.name}`);
                    else if (r) lokaceLN.push(`${reg.name} vpravo`);
                    else if (l) lokaceLN.push(`${reg.name} vlevo`);
                });

                const bilatNodes = [
                    { id: 'cia', name: 'podél CIA' },
                    { id: 'eia', name: 'podél EIA' },
                    { id: 'iia', name: 'podél IIA' },
                    { id: 'obt', name: 'v obturátorové jámě' },
                    { id: 'ing', name: 'inguinálně' }
                ];

                bilatNodes.forEach(reg => {
                    let r = ctx.isActive(`${p}_p_${reg.id}_r`);
                    let l = ctx.isActive(`${p}_p_${reg.id}_l`);
                    if (r && l) lokaceLN.push(`${reg.name} bilat.`);
                    else if (r) lokaceLN.push(`${reg.name} vpravo`);
                    else if (l) lokaceLN.push(`${reg.name} vlevo`);
                });

                let lokTextLN = lokaceLN.length > 0 ? formatCzechList(lokaceLN) : '';
                let dLN = LESIONS_DEFINITION.parseDetails(ctx, ctx.examId, 'rectum', p, `${p}_met`, `${p}_e`, true);

                if (dLN.hasAny || lokaceLN.length > 0) {
                    let repSentence = `${dLN.baseText} ${lokTextLN}${dLN.vzhledText}${dLN.metrikyStr}${dLN.doplneniStr}.`.replace(/\s+/g, ' ').replace(' .', '.');
                    reportOut.push({ type: 'frame', text: repSentence, tableId: `rectum_lymphnode_main__${instId}` });
                    
                    let concSentence = `${dLN.baseText} ${lokTextLN}${dLN.actStr}${dLN.dynStr}`;
                    if (dLN.etioStr) concSentence += `, ${dLN.etioStr}.`;
                    else concSentence += `.`;
                    
                    concSentence = concSentence.replace(/\s+/g, ' ').replace(' ,', ',').replace(' .', '.');
                    
                    let isSus = concSentence.toLowerCase().includes('meta') || concSentence.toLowerCase().includes('maligní') || concSentence.toLowerCase().includes('susp');
                    if (isSus) {
                        concMain.push({ type: 'frame', text: concSentence, tableId: `rectum_lymphnode_main__${instId}` });
                    } else {
                        concInc.push({ type: 'frame', text: concSentence, tableId: `rectum_lymphnode_main__${instId}` });
                    }
                }
            });
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};