const RegionLSp = {
    title: 'Bederní páteř',
    reportLayout: 'block',
    buttons: {
        axis: { states: ['přímá', '(', '((', '(((', ')', '))', ')))'] },
        lordosis: { states: ['přiměřená', 'mělká', 'vyrovnaná', 'kyfotizace'] },
        lstv: { states: ['není', 'L5', 'S1'] },
        shape: { states: ['tělo', 'schmorl', 'H plotna', 'D plotna', 'klínovitá', 'výrazná', 'propagace'] },
        shift: { states: ['posun', 'ventr', 'ventr+lýza', 'dorz', 'dorz+lýza'] },
        lesion: { states: ['léze', 'hemangiom', 'atyp', 'maligní'] },
        surgery: { states: ['operace', 'stabil', 'náhrada'] },
        degen: { states: ['DDD', 'mírná', 'střední', 'výrazná', 'náhrada'] },
        modic: { states: ['Modic', 'Modic I', 'Modic II', 'Modic III', 'destrukce'] },
        protrusion: { states: ['protruze', 'bulging', 'herniace', 'spondylofyty', 'kombinace'] },
        asym: { type: 'basic', text: 'asym' },
        migration: { states: ['M0', 'M↑', 'M↓'] },
        arthrosis: { states: ['artróza', 'I', 'II', 'III', 'IR', 'IIR', 'IL', 'IIL'] },
        sten_f: { states: ['F', '0', '1', '2', '3'] },
        sten_p: { states: ['P', '0', '1', '2', '3', 'S', 'F'] },
        sten_c: { states: ['C', '0', '1', '2', '3'] },
        expansion: { states: ['expanze', 'ED-cysta', 'ID-meningeom', 'ID-schwannom', 'IM-ependymom', 'IM-astrocytom', 'IM-hemangiobl.'] },
        exp_side: { states: ['0', 'R', 'L', 'C'] },
        lamin: { states: ['operace', 'lamin.', 'lamin R', 'lamin L'] }
    },
    layout: (helpers) => {
        const axisTable = helpers.TableGrid('spine_lumbar_axis', [
            [ 'Osa:', { btn: 'axis', id: 'lsp_axis' }, 'Lordóza:', { btn: 'lordosis', id: 'lsp_lordosis' }, 'LSTV:', { btn: 'lstv', id: 'lsp_lstv' } ],
            [ '', '', '', '' ],
            [ '', '', '', '' ],
            [ '', '', '', '' ], 
        ]);

        const table = helpers.TableGrid('spine_lumbar_main', [
            [ 'T11', { btn: 'shape', id: 't11_shape' }, [ { btn: 'shift', id: 't11_shift' }, { field: 'mm', id: 't11_shift_mm', placeholder: 'mm' } ], '', '', '', '', '', '', { btn: 'lesion', id: 't11_lesion' }, { btn: 'surgery', id: 't11_surgery' } ],
            [ 'T11/12', { btn: 'degen', id: 't11_12_degen' }, { btn: 'modic', id: 't11_12_modic' }, [ { btn: 'protrusion', id: 't11_12_protrusion' }, { btn: 'asym', id: 't11_12_asym' }, { field: 'mm', id: 't11_12_protrusion_mm', placeholder: 'mm' }, { btn: 'migration', id: 't11_12_migration' } ], { btn: 'arthrosis', id: 't11_12_arthro' }, [ { btn: 'sten_f', id: 't11_12_f_r' }, { btn: 'sten_p', id: 't11_12_p_r' }, { btn: 'sten_c', id: 't11_12_c' }, { btn: 'sten_p', id: 't11_12_p_l' }, { btn: 'sten_f', id: 't11_12_f_l' } ], { field: 'size', id: 't11_12_size', placeholder: 'dur.vak mm' }, '', '', [ { btn: 'expansion', id: 't11_12_expansion' }, { btn: 'exp_side', id: 't11_12_exp_side' }, { field: 'size', id: 't11_12_expansion_size', placeholder: 'rozměr' } ], { btn: 'lamin', id: 't11_12_lamin' } ],
            [ 'T12', { btn: 'shape', id: 't12_shape' }, [ { btn: 'shift', id: 't12_shift' }, { field: 'mm', id: 't12_shift_mm', placeholder: 'mm' } ], '', '', '', '', '', '', { btn: 'lesion', id: 't12_lesion' }, { btn: 'surgery', id: 't12_surgery' } ],
            [ 'T12/L1', { btn: 'degen', id: 't12_l1_degen' }, { btn: 'modic', id: 't12_l1_modic' }, [ { btn: 'protrusion', id: 't12_l1_protrusion' }, { btn: 'asym', id: 't12_l1_asym' }, { field: 'mm', id: 't12_l1_protrusion_mm', placeholder: 'mm' }, { btn: 'migration', id: 't12_l1_migration' } ], { btn: 'arthrosis', id: 't12_l1_arthro' }, [ { btn: 'sten_f', id: 't12_l1_f_r' }, { btn: 'sten_p', id: 't12_l1_p_r' }, { btn: 'sten_c', id: 't12_l1_c' }, { btn: 'sten_p', id: 't12_l1_p_l' }, { btn: 'sten_f', id: 't12_l1_f_l' } ], { field: 'size', id: 't12_l1_size', placeholder: 'dur.vak mm' }, '', '', [ { btn: 'expansion', id: 't12_l1_expansion' }, { btn: 'exp_side', id: 't12_l1_exp_side' }, { field: 'size', id: 't12_l1_expansion_size', placeholder: 'rozměr' } ], { btn: 'lamin', id: 't12_l1_lamin' } ],
            [ 'L1', { btn: 'shape', id: 'l1_shape' }, [ { btn: 'shift', id: 'l1_shift' }, { field: 'mm', id: 'l1_shift_mm', placeholder: 'mm' } ], '', '', '', '', '', '', { btn: 'lesion', id: 'l1_lesion' }, { btn: 'surgery', id: 'l1_surgery' } ],
            [ 'L1/2', { btn: 'degen', id: 'l1_2_degen' }, { btn: 'modic', id: 'l1_2_modic' }, [ { btn: 'protrusion', id: 'l1_2_protrusion' }, { btn: 'asym', id: 'l1_2_asym' }, { field: 'mm', id: 'l1_2_protrusion_mm', placeholder: 'mm' }, { btn: 'migration', id: 'l1_2_migration' } ], { btn: 'arthrosis', id: 'l1_2_arthro' }, [ { btn: 'sten_f', id: 'l1_2_f_r' }, { btn: 'sten_p', id: 'l1_2_p_r' }, { btn: 'sten_c', id: 'l1_2_c' }, { btn: 'sten_p', id: 'l1_2_p_l' }, { btn: 'sten_f', id: 'l1_2_f_l' } ], { field: 'size', id: 'l1_2_size', placeholder: 'dur.vak mm' }, '', '', [ { btn: 'expansion', id: 'l1_2_expansion' }, { btn: 'exp_side', id: 'l1_2_exp_side' }, { field: 'size', id: 'l1_2_expansion_size', placeholder: 'rozměr' } ], { btn: 'lamin', id: 'l1_2_lamin' } ],
            [ 'L2', { btn: 'shape', id: 'l2_shape' }, [ { btn: 'shift', id: 'l2_shift' }, { field: 'mm', id: 'l2_shift_mm', placeholder: 'mm' } ], '', '', '', '', '', '', { btn: 'lesion', id: 'l2_lesion' }, { btn: 'surgery', id: 'l2_surgery' } ],
            [ 'L2/3', { btn: 'degen', id: 'l2_3_degen' }, { btn: 'modic', id: 'l2_3_modic' }, [ { btn: 'protrusion', id: 'l2_3_protrusion' }, { btn: 'asym', id: 'l2_3_asym' }, { field: 'mm', id: 'l2_3_protrusion_mm', placeholder: 'mm' }, { btn: 'migration', id: 'l2_3_migration' } ], { btn: 'arthrosis', id: 'l2_3_arthro' }, [ { btn: 'sten_f', id: 'l2_3_f_r' }, { btn: 'sten_p', id: 'l2_3_p_r' }, { btn: 'sten_c', id: 'l2_3_c' }, { btn: 'sten_p', id: 'l2_3_p_l' }, { btn: 'sten_f', id: 'l2_3_f_l' } ], { field: 'size', id: 'l2_3_size', placeholder: 'dur.vak mm' }, '', '', [ { btn: 'expansion', id: 'l2_3_expansion' }, { btn: 'exp_side', id: 'l2_3_exp_side' }, { field: 'size', id: 'l2_3_expansion_size', placeholder: 'rozměr' } ], { btn: 'lamin', id: 'l2_3_lamin' } ],
            [ 'L3', { btn: 'shape', id: 'l3_shape' }, [ { btn: 'shift', id: 'l3_shift' }, { field: 'mm', id: 'l3_shift_mm', placeholder: 'mm' } ], '', '', '', '', '', '', { btn: 'lesion', id: 'l3_lesion' }, { btn: 'surgery', id: 'l3_surgery' } ],
            [ 'L3/4', { btn: 'degen', id: 'l3_4_degen' }, { btn: 'modic', id: 'l3_4_modic' }, [ { btn: 'protrusion', id: 'l3_4_protrusion' }, { btn: 'asym', id: 'l3_4_asym' }, { field: 'mm', id: 'l3_4_protrusion_mm', placeholder: 'mm' }, { btn: 'migration', id: 'l3_4_migration' } ], { btn: 'arthrosis', id: 'l3_4_arthro' }, [ { btn: 'sten_f', id: 'l3_4_f_r' }, { btn: 'sten_p', id: 'l3_4_p_r' }, { btn: 'sten_c', id: 'l3_4_c' }, { btn: 'sten_p', id: 'l3_4_p_l' }, { btn: 'sten_f', id: 'l3_4_f_l' } ], { field: 'size', id: 'l3_4_size', placeholder: 'dur.vak mm' }, '', '', [ { btn: 'expansion', id: 'l3_4_expansion' }, { btn: 'exp_side', id: 'l3_4_exp_side' }, { field: 'size', id: 'l3_4_expansion_size', placeholder: 'rozměr' } ], { btn: 'lamin', id: 'l3_4_lamin' } ],
            [ 'L4', { btn: 'shape', id: 'l4_shape' }, [ { btn: 'shift', id: 'l4_shift' }, { field: 'mm', id: 'l4_shift_mm', placeholder: 'mm' } ], '', '', '', '', '', '', { btn: 'lesion', id: 'l4_lesion' }, { btn: 'surgery', id: 'l4_surgery' } ],
            [ 'L4/5', { btn: 'degen', id: 'l4_5_degen' }, { btn: 'modic', id: 'l4_5_modic' }, [ { btn: 'protrusion', id: 'l4_5_protrusion' }, { btn: 'asym', id: 'l4_5_asym' }, { field: 'mm', id: 'l4_5_protrusion_mm', placeholder: 'mm' }, { btn: 'migration', id: 'l4_5_migration' } ], { btn: 'arthrosis', id: 'l4_5_arthro' }, [ { btn: 'sten_f', id: 'l4_5_f_r' }, { btn: 'sten_p', id: 'l4_5_p_r' }, { btn: 'sten_c', id: 'l4_5_c' }, { btn: 'sten_p', id: 'l4_5_p_l' }, { btn: 'sten_f', id: 'l4_5_f_l' } ], { field: 'size', id: 'l4_5_size', placeholder: 'dur.vak mm' }, '', '', [ { btn: 'expansion', id: 'l4_5_expansion' }, { btn: 'exp_side', id: 'l4_5_exp_side' }, { field: 'size', id: 'l4_5_expansion_size', placeholder: 'rozměr' } ], { btn: 'lamin', id: 'l4_5_lamin' } ],
            [ 'L5', { btn: 'shape', id: 'l5_shape' }, [ { btn: 'shift', id: 'l5_shift' }, { field: 'mm', id: 'l5_shift_mm', placeholder: 'mm' } ], '', '', '', '', '', '', { btn: 'lesion', id: 'l5_lesion' }, { btn: 'surgery', id: 'l5_surgery' } ],
            [ 'L5/S1', { btn: 'degen', id: 'l5_s1_degen' }, { btn: 'modic', id: 'l5_s1_modic' }, [ { btn: 'protrusion', id: 'l5_s1_protrusion' }, { btn: 'asym', id: 'l5_s1_asym' }, { field: 'mm', id: 'l5_s1_protrusion_mm', placeholder: 'mm' }, { btn: 'migration', id: 'l5_s1_migration' } ], { btn: 'arthrosis', id: 'l5_s1_arthro' }, [ { btn: 'sten_f', id: 'l5_s1_f_r' }, { btn: 'sten_p', id: 'l5_s1_p_r' }, { btn: 'sten_c', id: 'l5_s1_c' }, { btn: 'sten_p', id: 'l5_s1_p_l' }, { btn: 'sten_f', id: 'l5_s1_f_l' } ], { field: 'size', id: 'l5_s1_size', placeholder: 'dur.vak mm' }, '', '', [ { btn: 'expansion', id: 'l5_s1_expansion' }, { btn: 'exp_side', id: 'l5_s1_exp_side' }, { field: 'size', id: 'l5_s1_expansion_size', placeholder: 'rozměr' } ], { btn: 'lamin', id: 'l5_s1_lamin' } ],
            [ 'S1', { btn: 'shape', id: 's1_shape' }, [ { }, {  } ], '', '', '', '', '', '', { btn: 'lesion', id: 's1_lesion' }, { btn: 'surgery', id: 's1_surgery' } ],
        ]);

        const slider = el('div', { className: 'row', style: 'margin: 15px 0; justify-content: center; width: 100%; border-top: 1px solid var(--border); padding-top: 15px;' }, [
            el('span', { className: 'label', style: 'font-size: 11px;', textContent: 'Závěr: První patologie' }),
            el('label', { className: 'switch', style: 'margin: 0 10px;' }, [
                el('input', { 
                    type: 'checkbox', 
                    id: 'ls_spine_conc_mode_toggle',
                    onchange: (e) => { 
                        Store.fields['ls_spine_conc_mode'] = e.target.checked ? 'stenosis' : 'pathology'; 
                        UI.renderReport(); 
                    } 
                }),
                el('span', { className: 'slider' })
            ]),
            el('span', { className: 'label', style: 'font-size: 11px;', textContent: 'První stenózy' })
        ]);

        setTimeout(() => {
            const cb = document.getElementById('ls_spine_conc_mode_toggle');
            if (cb) cb.checked = Store.fields['ls_spine_conc_mode'] === 'stenosis';
        }, 0);

        return [axisTable, table, slider];
    },
    compile: (ctx) => {
        let reportBlocks = [];
        let mainConc = [];
        let incConc = [];

        reportBlocks.push({ type: 'heading', text: 'Bederní páteř:', regionId: 'ls_spine', action: 'open-region' });

        const segments = [
            { label: 'T11/12', vPfx: 't11', sPfx: 't11_12', vLabel: 'T11', root: 'T12' },
            { label: 'T12/L1', vPfx: 't12', sPfx: 't12_l1', vLabel: 'T12', root: 'L1' },
            { label: 'L1/2',    vPfx: 'l1',  sPfx: 'l1_2',   vLabel: 'L1',  root: 'L2' },
            { label: 'L2/3',    vPfx: 'l2',  sPfx: 'l2_3',   vLabel: 'L2',  root: 'L3' },
            { label: 'L3/4',    vPfx: 'l3',  sPfx: 'l3_4',   vLabel: 'L3',  root: 'L4' },
            { label: 'L4/5',    vPfx: 'l4',  sPfx: 'l4_5',   vLabel: 'L4',  root: 'L5' },
            { label: 'L5/S1',   vPfx: 'l5',  sPfx: 'l5_s1',  vLabel: 'L5',  root: 'S1' },
            { label: 'S1/2',    vPfx: 's1',  sPfx: 's1_2',   vLabel: 'S1',  root: 'S2' }
        ];

        const formatSentence = (str) => {
            if (!str) return '';
            let s = str.trim();
            s = s.charAt(0).toUpperCase() + s.slice(1);
            if (!s.endsWith('.')) s += '.';
            return s;
        };
        
        const joinCzech = (arr) => {
            const valid = arr.filter(v => v && v.trim() !== '');
            if (valid.length === 0) return '';
            if (valid.length === 1) return valid[0];
            if (valid.length === 2) return valid.join(' a ');
            return valid.slice(0, -1).join(', ') + ' a ' + valid[valid.length - 1];
        };

        let staticSentences = [];
        let concStaticSentences = [];

        const axisState = ctx.text('lsp_axis');
        if (axisState && axisState !== '0') {
            const axisMap = {
                'přímá': 'Osa přímá',
                '(': 'mírná sinistrokonvexní skolióza',
                '((': 'střední sinistrokonvexní skolióza',
                '(((': 'výrazná sinistrokonvexní skolióza',
                ')': 'mírná dextrokonvexní skolióza',
                '))': 'střední dextrokonvexní skolióza',
                ')))': 'výrazná dextrokonvexní skolióza'
            };
            const axisText = axisMap[axisState];
            if (axisText) {
                const sentence = formatSentence(axisText);
                staticSentences.push(sentence);
                if (axisState !== 'přímá') {
                    concStaticSentences.push(sentence);
                }
            }
        }

        const lordosisState = ctx.text('lsp_lordosis');
        if (lordosisState && lordosisState !== '0') {
            const lordosisMap = {
                'přiměřená': 'přiměřená bederní lordóza',
                'mělká': 'mělká bederní lordóza',
                'vyrovnaná': 'vyrovnaná bederní lordóza',
                'kyfotizace': 'kyfotizace bederní páteře'
            };
            const lordosisText = lordosisMap[lordosisState];
            if (lordosisText) {
                const sentence = formatSentence(lordosisText);
                staticSentences.push(sentence);
                if (lordosisState !== 'přiměřená') {
                    concStaticSentences.push(sentence);
                }
            }
        }

        const lstvState = ctx.text('lsp_lstv');
        if (lstvState && lstvState !== 'není' && lstvState !== '0') {
            const lstvText = formatSentence(`přechodný LS obratel, počítán jako ${lstvState}`);
            staticSentences.push(lstvText);
            concStaticSentences.push(lstvText);
        }

        if (concStaticSentences.length > 0) {
            mainConc.push({ type: 'frame', text: concStaticSentences.join(' ') });
        }

        let collShapes = {};
        let collSurgeries = {};
        let segmentBlocks = [];
        let hasSegmentPathology = false;
        let hasSpinalStenosis = false;
        let hasForaminalStenosis = false;
        let collLesions = {};
        let collLamin = {};
        let collModic = {};
        let collDegenNahrada = [];

        segments.forEach(seg => {
            let sentences = [];
            let causesNom = [];
            let causesGen = [];
            let effectsNom = [];
            let effectsDat = [];

            const shape = ctx.text(`${seg.vPfx}_shape`);
            if (shape && shape !== 'tělo') {
                if (shape === 'propagace') {
                    sentences.push(formatSentence('propagace zadní hrany obratl. těla dorzálně'));
                }
                if (!collShapes[shape]) collShapes[shape] = []; 
                collShapes[shape].push(seg.vLabel);
            }

            const surgery = ctx.text(`${seg.vPfx}_surgery`);
            if (surgery && surgery !== 'operace') {
                if (!collSurgeries[surgery]) collSurgeries[surgery] = [];
                collSurgeries[surgery].push(seg.vLabel);
            }

            const lesion = ctx.text(`${seg.vPfx}_lesion`);
            if (lesion && lesion !== 'léze') {
                if (!collLesions[lesion]) collLesions[lesion] = [];
                collLesions[lesion].push(seg.vLabel);
            }

            const lamin = ctx.text(`${seg.sPfx}_lamin`);
            if (lamin && lamin !== 'operace') {
                if (!collLamin[lamin]) collLamin[lamin] = [];
                collLamin[lamin].push(seg.vLabel);
            }

            const degen = ctx.text(`${seg.sPfx}_degen`);
            let degenModifier = '';
            let degenDesc = '';
            
            if (degen === 'náhrada') {
                collDegenNahrada.push(seg.label);
            } else if (degen && degen !== 'DDD') {
                if (degen === 'mírná') { degenModifier = 'mírně sníženého '; degenDesc = 'mírná degenerace disku'; }
                else if (degen === 'střední') { degenModifier = 'středně sníženého '; degenDesc = 'střední degenerace disku'; }
                else if (degen === 'výrazná') { degenModifier = 'výrazně sníženého '; degenDesc = 'výrazná degenerace disku'; }
            }

            const modic = ctx.text(`${seg.sPfx}_modic`);
            if (modic && modic !== 'Modic') {
                const modicMap = { 'Modic I': 'STIR+ signál pod krycími plotnami', 'Modic II': 'T1+ signál pod krycími plotnami', 'Modic III': 'skleróza pod krycími plotnami', 'destrukce': 'destrukce krycích ploten' };
                sentences.push(formatSentence(modicMap[modic] || modic));
                
                if (!collModic[modic]) collModic[modic] = [];
                collModic[modic].push(seg.label);
            }

            const shift = ctx.text(`${seg.vPfx}_shift`);
            const shiftMm = ctx.field(`${seg.vPfx}_shift_mm`);
            if (shift && shift !== 'posun') {
                const typeStr = shift.includes('ventr') ? `ventrolistéza ${seg.vLabel}` : `retrolistéza ${seg.vLabel}`;
                const lStr = shift.includes('lýza') ? 's lýzou oblouku' : 'bez lýzy oblouku';
                const mmStr = shiftMm ? ` o ${shiftMm} mm` : '';
                
                let gradeStr = mmStr;
                if (shiftMm) {
                    const mm = parseFloat(shiftMm.replace(',', '.'));
                    if (!isNaN(mm)) {
                        if (mm <= 7) gradeStr = ' I.st.';
                        else if (mm <= 9) gradeStr = ' I/II.st.';
                        else if (mm <= 15) gradeStr = ' II.st.';
                        else if (mm <= 17) gradeStr = ' II/III.st.';
                        else gradeStr = ' III.st.';
                    }
                }

                sentences.push(formatSentence(`${typeStr}${mmStr} ${shift.includes('lýza') ? 's lýzou oblouku' : ''}`));
                
                causesNom.push(`${typeStr}${gradeStr} ${lStr}`);
                causesGen.push(`${typeStr.replace('listéza', 'listézy')}${gradeStr} ${lStr}`);
            }

            const valFR = ctx.text(`${seg.sPfx}_f_r`);
            const valPR = ctx.text(`${seg.sPfx}_p_r`);
            const valC  = ctx.text(`${seg.sPfx}_c`);
            const valPL = ctx.text(`${seg.sPfx}_p_l`);
            const valFL = ctx.text(`${seg.sPfx}_f_l`);

            const hasZero = (valFR === '0' || valPR === '0' || valC === '0' || valPL === '0' || valFL === '0');

            let locStates = [];
            
            if (valFR === valFL && valFR && valFR !== 'F' && valFR !== '0') {
                locStates.push({ type: 'F', val: valFR, isAct: true, name: 'foraminálně bilat.', t1: 'mírné zúžení obou foramin', t2: 'zúžení obou foramin', t3: `výrazné zúžení obou foramin s útlakem kořenů ${seg.vLabel} bilat.` });
            } else {
                locStates.push({ type: 'F', val: valFR, isAct: valFR && valFR !== 'F', zeroTxt: 'bez zúžení foramina vpravo', name: 'foraminálně vpravo', t1: 'mírné zúžení foramina vpravo', t2: 'zúžení foramina vpravo', t3: `výrazné zúžení foramina vpravo s útlakem kořene ${seg.vLabel} vpravo` });
                locStates.push({ type: 'F', val: valFL, isAct: valFL && valFL !== 'F', zeroTxt: 'bez zúžení foramina vlevo', name: 'foraminálně vlevo', t1: 'mírné zúžení foramina vlevo', t2: 'zúžení foramina vlevo', t3: `výrazné zúžení foramina vlevo s útlakem kořene ${seg.vLabel} vlevo` });
            }

            if (valPR === valPL && valPR && valPR !== 'P' && valPR !== '0') {
                locStates.push({ type: 'P', val: valPR, isAct: true, name: 'paracentrálně bilat.', t1: `kontakt s kořeny ${seg.root} bilat.`, t2: `dislokace kořenů ${seg.root} bilat.`, t3: `komprese kořenů ${seg.root} bilat.`, tS: 'stenóza laterálních recesů bilat.' });
            } else {
                locStates.push({ type: 'P', val: valPR, isAct: valPR && valPR !== 'P', zeroTxt: `bez tlaku na kořen ${seg.root} vpravo`, name: 'paracentrálně vpravo', t1: `kontakt s kořenem ${seg.root} vpravo`, t2: `dislokace kořene ${seg.root} vpravo`, t3: `komprese kořene ${seg.root} vpravo`, tS: 'stenóza laterálního recesu vpravo' });
                locStates.push({ type: 'P', val: valPL, isAct: valPL && valPL !== 'P', zeroTxt: `bez tlaku na kořen ${seg.root} vlevo`, name: 'paracentrálně vlevo', t1: `kontakt s kořenem ${seg.root} vlevo`, t2: `dislokace kořene ${seg.root} vlevo`, t3: `komprese kořene ${seg.root} vlevo`, tS: 'stenóza laterálního recesu vlevo' });
            }

            locStates.push({ type: 'C', val: valC,  isAct: valC && valC !== 'C', zeroTxt: 'bez tlaku na durální vak', name: 'centrálně', t1: 'mírná imprese durálního vaku', t2: 'útlak durálního vaku', t3: 'výrazný útlak durálního vaku s agregací kaudy' });
            
            const activeLocs = locStates.filter(l => l.isAct);

            const protr = ctx.text(`${seg.sPfx}_protrusion`);
            const protrMm = ctx.field(`${seg.sPfx}_protrusion_mm`);
            const asym = ctx.isActive(`${seg.sPfx}_asym`);
            const migration = ctx.text(`${seg.sPfx}_migration`);
            
            if (protr && protr !== 'protruze') {
                const protrMap = { 'bulging': `bulging ${degenModifier}disku`.trim(), 'herniace': `herniace ${degenModifier}disku`.trim(), 'spondylofyty': 'spondylofyty okrajů krycích ploch', 'kombinace': `kombinace spondylofytů a protruze ${degenModifier}disku`.trim() };
                let baseProtr = protrMap[protr] || protr;
                if (protrMm) baseProtr += ` o ${protrMm} mm`;

                const protrMapConc = { 'bulging': 'bulging disku', 'herniace': 'herniace disku', 'spondylofyty': 'spondylofyty', 'kombinace': 'kombinace spondylofytů a protruze disku' };
                let pTxt = protrMapConc[protr] || protr;

                let locNames = activeLocs.map(l => l.name);
                let locStr = '';
                if (locNames.length === 1) locStr = ` ${locNames[0]}`;
                else if (locNames.length > 1) locStr = ` ${locNames[0]} až ${locNames[locNames.length - 1]}`;

                if (locStr) {
                    if (['bulging', 'spondylofyty', 'kombinace'].includes(protr)) {
                        if (asym) {
                            baseProtr += ` s akcentací${locStr}`;
                            pTxt += ` s akcentací${locStr}`;
                        }
                    } else {
                        baseProtr += locStr;
                        pTxt += locStr;
                    }
                }

                if (protr === 'herniace' && migration && migration !== 'M0') {
                    const migText = migration === 'M↑' ? ' s kraniální migrací' : ' s kaudální migrací';
                    baseProtr += migText;
                    pTxt += migText;
                }

                sentences.push(formatSentence(baseProtr));

                causesNom.push(pTxt);
                causesGen.push(pTxt.replace('bulging', 'bulgingu').replace('spondylofyty', 'spondylofytů'));
            } else if (degenDesc) {
                sentences.push(formatSentence(degenDesc));
                causesNom.push(degenDesc);
                causesGen.push(degenDesc.replace('mírná', 'mírné').replace('výrazná', 'výrazné'));
            }

            const activeCount = activeLocs.length;
            const popisOrderMap = { 'C': 1, 'P': 2, 'F': 3 };
            let stenosisLocs = [...activeLocs].sort((a, b) => popisOrderMap[a.type] - popisOrderMap[b.type]);
            
            stenosisLocs.forEach(loc => {
                if (loc.val === '0') { if (activeCount === 1) sentences.push(formatSentence(loc.zeroTxt)); }
                else if (loc.val === '1') sentences.push(formatSentence(loc.t1));
                else if (loc.val === '2') sentences.push(formatSentence(loc.t2));
                else if (loc.val === '3') sentences.push(formatSentence(loc.t3));
                else if (loc.val === 'S') sentences.push(formatSentence(loc.tS));
            });

            const arthro = ctx.text(`${seg.sPfx}_arthro`);
            if (arthro && arthro !== 'artróza') {
                const arthroMap = { 'I': 'mírná degenerace facetových skloubení', 'II': 'střední degenerace facetových skloubení', 'III': 'výrazná degenerace facetových skloubení', 'IR': 'mírná degenerace facetových skloubení vpravo', 'IIR': 'střední degenerace facetových skloubení vpravo', 'IL': 'mírná degenerace facetových skloubení vlevo', 'IIL': 'střední degenerace facetových skloubení vlevo' };
                sentences.push(formatSentence(arthroMap[arthro] || arthro));

                const arthroMapConc = { 'I': 'mírná facetová artróza', 'II': 'střední facetová artróza', 'III': 'výrazná facetová artróza', 'IR': 'mírná facetová artróza vpravo', 'IIR': 'střední facetová artróza vpravo', 'IL': 'mírná facetová artróza vlevo', 'IIL': 'střední facetová artróza vlevo' };
                let aTxt = arthroMapConc[arthro] || arthro;
                causesNom.push(aTxt);
                causesGen.push(aTxt.replace('artróza', 'artrózy').replace('mírná', 'mírné').replace('výrazná', 'výrazné').replace('facetová', 'facetové'));
            }

            const size = ctx.field(`${seg.sPfx}_size`);
            if (size) {
                if (size.includes('x')) sentences.push(formatSentence(`durální vak rozměrů cca ${size} mm`));
                else sentences.push(formatSentence(`durální vak šíře ${size} mm`));
            }

            const expansion = ctx.text(`${seg.sPfx}_expansion`);
            const expSide = ctx.text(`${seg.sPfx}_exp_side`);
            const expSize = ctx.field(`${seg.sPfx}_expansion_size`);
            if (expansion && expansion !== 'expanze') {
                const expMap = { 'ED-cysta': 'epidurální cystická struktura', 'ID-meningeom': 'intradurální extramedulární expanze', 'ID-schwannom': 'intradurální expanze v průběhu kořene', 'IM-ependymom': 'intramedulární expanze', 'IM-astrocytom': 'intramedulární expanze', 'IM-hemangiobl.': 'intramedulární expanze' };
                let expText = expMap[expansion] || expansion;
                if (expSide && expSide !== '0') {
                    const sideMap = { 'R': 'vpravo', 'L': 'vlevo', 'C': 'centrálně' };
                    expText += ` ${sideMap[expSide] || expSide}`;
                }
                if (expSize) {
                    if (expSize.includes('x')) expText += ` rozměru ${expSize} mm`;
                    else expText += ` diametru ${expSize} mm`;
                }
                sentences.push(formatSentence(expText));

                const expMapConc = { 'ED-cysta': 'epidurální cysta', 'ID-meningeom': 'intradurální ložisko (susp. meningeom)', 'ID-schwannom': 'intradurální ložisko v průběhu kořene (susp. schwannom)', 'IM-ependymom': 'intramedulární expanze (susp. ependymom)', 'IM-astrocytom': 'intramedulární expanze (susp. astrocytom)', 'IM-hemangiobl.': 'intramedulární expanze (susp. hemangioblastom)' };
                let eTxt = expMapConc[expansion] || expansion;
                if (expSide && expSide !== '0') {
                    const sideMap = { 'R': 'vpravo', 'L': 'vlevo', 'C': 'centrálně' };
                    eTxt += ` ${sideMap[expSide] || expSide}`;
                }
                causesNom.push(eTxt);
                causesGen.push(eTxt.replace('cysta', 'cysty').replace('intradurální ložisko', 'intradurálního ložiska').replace('ložisko', 'ložiska'));
            }

            if (sentences.length > 0) {
                hasSegmentPathology = true;
                segmentBlocks.push({ type: 'frame', text: `${seg.label}: ${sentences.join(' ')}` });
            }

            if (valC && valC !== '0' && valC !== 'C') hasSpinalStenosis = true;
            if (valPR && valPR !== '0' && valPR !== 'P' && valPR !== 'F') hasSpinalStenosis = true;
            if (valPL && valPL !== '0' && valPL !== 'P' && valPL !== 'F') hasSpinalStenosis = true;
            if (valFR && valFR !== '0' && valFR !== 'F') hasForaminalStenosis = true;
            if (valFL && valFL !== '0' && valFL !== 'F') hasForaminalStenosis = true;

            let fibrosisArr = [];
            
            const getEffect = (val, type, side) => {
                let nom = '', dat = '';
                let sev = val === '3' ? 3 : (val === '2' || val === 'S' ? 2 : 1);
                let typeOrder = type === 'C' ? 1 : (type === 'P' ? 2 : 3);

                if (type === 'F') {
                    if (val === '3') { 
                        nom = `výrazná stenóza foramina ${side} s útlakem kořene ${seg.vLabel} ${side}`; 
                        dat = `výrazné stenóze foramina ${side} s útlakem kořene ${seg.vLabel} ${side}`; 
                    } else { 
                        nom = val === '1' ? `mírná stenóza foramina ${side}` : `stenóza foramina ${side}`; 
                        dat = val === '1' ? `mírné stenóze foramina ${side}` : `stenóze foramina ${side}`; 
                    }
                } else if (type === 'P') {
                    if (val === '1') { nom = `kontakt s kořenem ${seg.root} ${side}`; dat = `kontaktu s kořenem ${seg.root} ${side}`; }
                    else if (val === '2') { nom = `dislokace kořene ${seg.root} ${side}`; dat = `dislokaci kořene ${seg.root} ${side}`; }
                    else if (val === '3') { nom = `útlak kořene ${seg.root} ${side}`; dat = `útlaku kořene ${seg.root} ${side}`; }
                    else if (val === 'S') { nom = `stenóza laterálního recesu ${side}`; dat = `stenóze laterálního recesu ${side}`; }
                    else if (val === 'F') { 
                        fibrosisArr.push(`epidurální fibróza ${side}`);
                        sentences.push(formatSentence(`epidurální fibróza ${side}`));
                        return null; 
                    }
                } else if (type === 'C') {
                    if (val === '1') { nom = `mírná spinální stenóza`; dat = `mírné spinální stenóze`; }
                    else if (val === '2') { nom = `spinální stenóza`; dat = `spinální stenóze`; }
                    else if (val === '3') { nom = `výrazná spinální stenóza s agregací kaudy`; dat = `výrazné spinální stenóze s agregací kaudy`; }
                }
                return { nom, dat, sev, typeOrder };
            };

            const getBilatEffect = (val, type) => {
                let nom = '', dat = '';
                let sev = val === '3' ? 3 : (val === '2' || val === 'S' ? 2 : 1);
                let typeOrder = type === 'C' ? 1 : (type === 'P' ? 2 : 3);

                if (type === 'F') {
                    if (val === '3') { 
                        nom = `výrazná stenóza obou foramin s útlakem kořenů ${seg.vLabel} bilat.`; 
                        dat = `výrazné stenóze obou foramin s útlakem kořenů ${seg.vLabel} bilat.`; 
                    } else { 
                        nom = val === '1' ? `mírná stenóza obou foramin` : `stenóza obou foramin`; 
                        dat = val === '1' ? `mírné stenóze obou foramin` : `stenóze obou foramin`; 
                    }
                } else if (type === 'P') {
                    if (val === '1') { nom = `kontakt s kořeny ${seg.root} bilat.`; dat = `kontaktu s kořeny ${seg.root} bilat.`; }
                    else if (val === '2') { nom = `dislokace kořenů ${seg.root} bilat.`; dat = `dislokaci kořenů ${seg.root} bilat.`; }
                    else if (val === '3') { nom = `útlak kořenů ${seg.root} bilat.`; dat = `útlaku kořenů ${seg.root} bilat.`; }
                    else if (val === 'S') { nom = `stenóza laterálních recesů bilat.`; dat = `stenóze laterálních recesů bilat.`; }
                    else if (val === 'F') { 
                        fibrosisArr.push(`epidurální fibróza bilat.`);
                        sentences.push(formatSentence(`epidurální fibróza bilat.`));
                        return null; 
                    }
                }
                return { nom, dat, sev, typeOrder };
            };

            let mappedEffects = [];
            
            if (valC && valC !== '0' && valC !== 'C') {
                let eff = getEffect(valC, 'C', '');
                if (eff) mappedEffects.push(eff);
            }

            if (valPR === valPL && valPR && valPR !== '0' && valPR !== 'P') {
                let eff = getBilatEffect(valPR, 'P');
                if (eff) mappedEffects.push(eff);
            } else {
                if (valPR && valPR !== '0' && valPR !== 'P') { let e = getEffect(valPR, 'P', 'vpravo'); if (e) mappedEffects.push(e); }
                if (valPL && valPL !== '0' && valPL !== 'P') { let e = getEffect(valPL, 'P', 'vlevo'); if (e) mappedEffects.push(e); }
            }

            if (valFR === valFL && valFR && valFR !== '0' && valFR !== 'F') {
                let eff = getBilatEffect(valFR, 'F');
                if (eff) mappedEffects.push(eff);
            } else {
                if (valFR && valFR !== '0' && valFR !== 'F') { let e = getEffect(valFR, 'F', 'vpravo'); if (e) mappedEffects.push(e); }
                if (valFL && valFL !== '0' && valFL !== 'F') { let e = getEffect(valFL, 'F', 'vlevo'); if (e) mappedEffects.push(e); }
            }

            mappedEffects.sort((a, b) => {
                if (b.sev !== a.sev) return b.sev - a.sev;
                return a.typeOrder - b.typeOrder;
            });

            mappedEffects.forEach(eff => {
                effectsNom.push(eff.nom);
                effectsDat.push(eff.dat);
            });

            let concLine = "";
            const isStenosisFirst = Store.fields['ls_spine_conc_mode'] === 'stenosis';

            if (causesNom.length > 0 || effectsNom.length > 0) {
                let causeStrNom = joinCzech(causesNom);
                let causeStrGen = joinCzech(causesGen);
                let effectStrNom = joinCzech(effectsNom);
                let effectStrDat = joinCzech(effectsDat);

                let prep = /^(s[bcdfghjklmnpqrstvwxz]|z[bcdfghjklmnpqrstvwxz]|š[bcdfghjklmnpqrstvwxz]|ž[bcdfghjklmnpqrstvwxz]|k|g)/i.test(effectStrDat) ? 'ke' : 'k';

                if (!isStenosisFirst) {
                    if (causeStrNom && effectStrDat) concLine = `${causeStrNom} vedoucí ${prep} ${effectStrDat}.`;
                    else if (causeStrNom) {
                        if (hasZero) concLine = `${causeStrNom} bez útlaku nervových struktur.`;
                        else concLine = `${causeStrNom}.`;
                    }
                    else if (effectStrNom) concLine = `${effectStrNom}.`;
                } else {
                    if (effectStrNom && causeStrGen) concLine = `${effectStrNom} na podkladě ${causeStrGen}.`;
                    else if (effectStrNom) concLine = `${effectStrNom}.`;
                    else if (causeStrNom) {
                        if (hasZero) concLine = `${causeStrNom} bez útlaku nervových struktur.`;
                        else concLine = `${causeStrNom}.`;
                    }
                }
            }

            if (fibrosisArr.length > 0) {
                let fStr = joinCzech(fibrosisArr);
                fStr = fStr.charAt(0).toUpperCase() + fStr.slice(1) + '.';
                if (concLine) concLine += ' ' + fStr;
                else concLine = fStr;
            }

            if (concLine) {
                concLine = concLine.charAt(0).toUpperCase() + concLine.slice(1);
                mainConc.push({ type: 'frame', text: `${seg.label}: ${concLine}` });
            }

            let iParts = [];
            if (lesion === 'atyp') iParts.push(`atypické ložisko ${seg.vLabel}`);
            
            if (iParts.length > 0) {
                let text = iParts.join(', ') + '.';
                mainConc.push({ type: 'frame', text: text.charAt(0).toUpperCase() + text.slice(1) });
            }
        });

        let modicConcSentences = [];
        if (collModic['Modic I']) modicConcSentences.push(`Edém krycích ploten ${joinCzech(collModic['Modic I'])} Modic I.`);
        if (collModic['Modic II']) modicConcSentences.push(`Tuková degenerace krycích ploten ${joinCzech(collModic['Modic II'])} Modic II.`);
        if (collModic['Modic III']) modicConcSentences.push(`Skleróza krycích ploten ${joinCzech(collModic['Modic III'])} Modic III.`);
        if (collModic['destrukce']) modicConcSentences.push(`Destrukce krycích ploten ${joinCzech(collModic['destrukce'])}.`);
        
        Object.keys(collModic).forEach(k => {
            if (!['Modic I', 'Modic II', 'Modic III', 'destrukce'].includes(k)) {
                modicConcSentences.push(`Změny krycích ploten typu ${k} ${joinCzech(collModic[k])}.`);
            }
        });

        if (modicConcSentences.length > 0) {
            mainConc.push({ type: 'frame', text: modicConcSentences.join(' ') });
        }

        let shapeSentences = [];
        if (collShapes['schmorl']) shapeSentences.push(collShapes['schmorl'].length > 1 ? `Schmorlovy uzly ${collShapes['schmorl'].join(', ')}.` : `Schmorlův uzel ${collShapes['schmorl'].join(', ')}.`);
        if (collShapes['H plotna']) shapeSentences.push(`Imprese horní krycí plotny ${collShapes['H plotna'].join(', ')}.`);
        if (collShapes['D plotna']) shapeSentences.push(`Imprese dolní krycí plotny ${collShapes['D plotna'].join(', ')}.`);
        if (collShapes['klínovitá']) shapeSentences.push(`Klínovitá komprese ${collShapes['klínovitá'].join(' - ')}.`);
        if (collShapes['výrazná']) shapeSentences.push(`Výrazná komprese těla ${collShapes['výrazná'].join(', ')}.`);
        if (collShapes['propagace']) shapeSentences.push(`Výrazná komprese těla ${collShapes['propagace'].join(', ')} s propagací dorzálně.`);

        let surgSentences = [];
        if (collSurgeries['stabil']) surgSentences.push(`Zadní stabilizace ${collSurgeries['stabil'].join('-')}.`);
        if (collSurgeries['náhrada']) surgSentences.push(`Náhrada těla ${collSurgeries['náhrada'].join(', ')}.`);
        if (collDegenNahrada.length > 0) surgSentences.push(`Náhrada disku ${collDegenNahrada.join(', ')}.`);
        if (collLamin['lamin.']) surgSentences.push(`Bilaterální laminektomie ${collLamin['lamin.'].join(', ')}.`);
        if (collLamin['lamin R']) surgSentences.push(`Laminektomie ${collLamin['lamin R'].join(', ')} vpravo.`);
        if (collLamin['lamin L']) surgSentences.push(`Laminektomie ${collLamin['lamin L'].join(', ')} vlevo.`);

        let lesionSentences = [];
        if (collLesions['hemangiom']) {
            let pl = collLesions['hemangiom'].length > 1;
            lesionSentences.push(`${pl ? 'Hemangiomy' : 'Hemangiom'} v obratlovém těle ${collLesions['hemangiom'].join(', ')}.`);
        }
        if (collLesions['maligní']) {
            let pl = collLesions['maligní'].length > 1;
            lesionSentences.push(`${pl ? 'Suspektní ložiska' : 'Suspektní ložisko'} v těle ${collLesions['maligní'].join(', ')}.`);
            mainConc.push({ type: 'frame', text: lesionSentences[lesionSentences.length - 1] });
        }

        // --- SKLÁDÁNÍ BLOKŮ REPORTU ---
        
        if (staticSentences.length > 0) {
            reportBlocks.push({ type: 'frame', text: staticSentences.join(' ') });
        }
        
        if (shapeSentences.length > 0) {
            reportBlocks.push({ type: 'frame', text: shapeSentences.join(' ') + ' Ostatní těla přiměřených výšek.' });
            mainConc.push({ type: 'frame', text: shapeSentences.join(' ') });
        } else {
            reportBlocks.push({ type: 'frame', text: 'Obratlová těla přiměřených výšek.' });
        }

        if (!hasSegmentPathology) {
            reportBlocks.push({ type: 'frame', text: 'Meziobratlové segmenty s disky přiměřených výšek, bez výraznějších protruzí a facetových artróz.' });
            reportBlocks.push({ type: 'frame', text: 'Páteřní kanál a foramina jsou volná.' });
        }

        if (surgSentences.length > 0) {
            reportBlocks.push({ type: 'frame', text: surgSentences.join(' ') });
            mainConc.push({ type: 'frame', text: surgSentences.join(' ') });
        }
        if (lesionSentences.length > 0) {
            reportBlocks.push({ type: 'frame', text: lesionSentences.join(' ') });
        }

        if (segmentBlocks.length > 0) {
            reportBlocks.push(...segmentBlocks);
        }

        if (hasSegmentPathology) {
            reportBlocks.push({ type: 'frame', text: 'Ostatní meziobratlové segmenty bez výraznější morfologické patologie.' });
            
            if (hasSpinalStenosis && hasForaminalStenosis) {
                reportBlocks.push({ type: 'frame', text: 'V ostatních segmentech bez jiných výraznějších spinálních a foraminálních stenóz.' });
            } else if (hasSpinalStenosis) {
                reportBlocks.push({ type: 'frame', text: 'V ostatních segmentech bez zřetelných spinálních stenóz. Foramina jsou volná.' });
            } else if (hasForaminalStenosis) {
                reportBlocks.push({ type: 'frame', text: 'Páteřní kanál zůstává volný. Bez jiných zřetelných foraminálních stenóz.' });
            } else {
                reportBlocks.push({ type: 'frame', text: 'Páteřní kanál a foramina jsou volná.' });
            }
        }
        
        reportBlocks.push({ type: 'frame', text: 'Přehledný úsek míchy bez signálových změn.' });

        return {
            report: reportBlocks,
            conclusion: { main: mainConc, incidental: incConc }
        };
    }
};