const RegionShoulder = {
    title: 'MR Ramene',
    reportLayout: 'block',
    layout: (helpers) => {
        
        // Factory pro rotátorovou manžetu
        const makeTendon = (id, title, prefix) => helpers.TableMain(id, title, [
            helpers.Table2colNormal(`${prefix}_table`, '', [
                [ 'Stav šlachy:', { btn: `${prefix}_stav`, states: ['0', 'tendinóza', 'parc. art. ruptura', 'parc. burz. ruptura', 'intrasub. ruptura', 'kompletní ruptura'] } ],
                [ 'Retrakce (Patte):', { btn: `${prefix}_retr`, states: ['0', 'St. 1', 'St. 2', 'St. 3'] } ],
                [ 'Tuková degen. (Goutallier):', { btn: `${prefix}_gout`, states: ['0', 'Gr. 1', 'Gr. 2', 'Gr. 3', 'Gr. 4'] } ],
                [ 'Sval. atrofie:', { btn: `${prefix}_atrofie`, states: ['0', '+', '++'] } ]
            ])
        ]);

        return [
            // --- AC KLOUB A AKROMION ---
            helpers.TableMain('shoulder_ac_main', 'AC kloub a Akromion', [
                helpers.Table2colNormal('shoulder_ac_table', '', [
                    [ 'Tvar akromia:', { btn: 'sh_ac_tvar', states: ['Typ I (ploché)', 'Typ II (křivka)', 'Typ III (hák)'] } ],
                    [ 'AC artróza:', { btn: 'sh_ac_art', states: ['0', 'mírná', 'pokročilá'] } ],
                    [ 'AC edém (BML):', { btn: 'sh_ac_edem', states: ['0', '+', '++'] } ],
                    [ 'Os acromiale:', { btn: 'sh_ac_os', states: ['0', 'přítomno', 'edém synchondrózy'] } ],
                    [ 'Impingement:', { btn: 'sh_ac_impingement', states: ['0', 'subakromiální', 'subkorakoidní'] } ]
                ])
            ]),

            // --- GH KLOUB A BURZY ---
            helpers.TableMain('shoulder_bursa_main', 'GH kloub a Burzy', [
                helpers.Table2colNormal('shoulder_bursa_table', '', [
                    [ 'GH náplň:', { btn: 'sh_gh_napln', states: ['0', '+', '++', '+++'] } ],
                    [ 'SASD burza:', { btn: 'sh_gh_sasd', states: ['0', 'mírná tekutina', 'bursitida', 'výrazná bursitida'] } ],
                    [ 'Subkorak. burza:', { btn: 'sh_gh_subcor', states: ['0', 'tekutina', 'bursitida'] } ],
                    [ 'Synovitida:', { btn: 'sh_gh_synov', states: ['0', '+', '++', 'Chondromatóza'] } ]
                ])
            ]),

            // --- ROTÁTOROVÁ MANŽETA ---
            makeTendon('shoulder_ssp_main', 'Supraspinatus (SSP)', 'sh_ssp'),
            makeTendon('shoulder_isp_main', 'Infraspinatus (ISP)', 'sh_isp'),
            makeTendon('shoulder_ssc_main', 'Subscapularis (SSC)', 'sh_ssc'),
            
            helpers.TableMain('shoulder_tm_main', 'Teres Minor (TM)', [
                helpers.Table2colNormal('sh_tm_table', '', [
                    [ 'Stav šlachy:', { btn: 'sh_tm_stav', states: ['0', 'tendinóza', 'parc. ruptura', 'kompletní ruptura'] } ],
                    [ 'Tuk. degen. / atrofie:', { btn: 'sh_tm_gout', states: ['0', '+', '++'] } ]
                ])
            ]),

            // --- BICEPS A BICEPSOVÁ KLADKA ---
            helpers.TableMain('shoulder_lhb_main', 'Šlacha dlouhé hlavy bicepsu (LHB)', [
                helpers.Table2colNormal('shoulder_lhb_table', '', [
                    [ 'Stav LHB:', { btn: 'sh_lhb_stav', states: ['0', 'tenosynovitida', 'tendinóza', 'parc. ruptura', 'kompletní ruptura'] } ],
                    [ 'Poloha v sulku:', { btn: 'sh_lhb_poloha', states: ['in situ', 'subluxace', 'luxace', 'prázdný sulkus'] } ],
                    [ 'Pulley léze:', { btn: 'sh_lhb_pulley', states: ['0', 'SGHL/CHL léze'] } ]
                ])
            ]),

            // --- LABRUM A LIGAMENTA ---
            helpers.TableMain('shoulder_labrum_main', 'Glenoidální labrum', [
                helpers.Table2colNormal('sh_lab_table', '', [
                    [ 'Horní labrum:', { btn: 'sh_lab_sup', states: ['0', 'degenerace', 'SLAP I', 'SLAP II', 'SLAP III', 'SLAP IV'] } ],
                    [ 'Přední labrum:', { btn: 'sh_lab_ant', states: ['0', 'degenerace', 'Bankart', 'ALPSA', 'Perthes'] } ],
                    [ 'Zadní labrum:', { btn: 'sh_lab_pos', states: ['0', 'degenerace', 'Reverse Bankart'] } ],
                    [ 'Paralabrální cysta:', { btn: 'sh_lab_cysta', states: ['0', 'spinoglenoidní', 'supraskapulární'] } ]
                ])
            ]),

            // --- SKELET A CHRUPAVKY ---
            helpers.TableMain('shoulder_bones_main', 'Skelet a chrupavky', [
                helpers.Table2colNormal('sh_bn_table', '', [
                    [ 'Defekt hlavice:', { btn: 'sh_bn_hlav', states: ['0', 'Hill-Sachs', 'kontuzní edém'] } ],
                    [ 'Defekt glenoidu:', { btn: 'sh_bn_glen', states: ['0', 'Bony Bankart', 'kontuzní edém'] } ],
                    [ 'GH chondropatie:', { btn: 'sh_bn_chr', states: ['0', 'Gr. 1', 'Gr. 2', 'Gr. 3', 'Gr. 4'] } ],
                    [ 'Kostní léze:', { btn: 'sh_bn_lesion', states: ['0', 'Enchondrom', 'Geoda', 'Hemangiom'] } ]
                ])
            ])
        ];
    },

    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Rameno:', action: 'open-region', regionId: 'shoulder' }];
        let concMain = [];
        let concInc = [];
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

        // --- 1. AC KLOUB A AKROMION ---
        let acParts = [];
        let acConc = [];
        let isAcNormal = true;

        const acTvar = ctx.text('sh_ac_tvar');
        if (acTvar && acTvar.includes('Typ')) {
            acParts.push(`akromion ${acTvar}`);
            if (acTvar.includes('Typ III')) {
                acConc.push('Akromion tvaru Bigliani III (hák) s predispozicí k impingementu');
                isAcNormal = false;
            }
        }

        const acArt = ctx.text('sh_ac_art');
        if (acArt && acArt !== '0') {
            acParts.push(`${acArt} hypertrofická AC artróza`);
            acConc.push(`AC artróza (${acArt})`);
            isAcNormal = false;
        }

        const acEdem = ctx.text('sh_ac_edem');
        if (acEdem && acEdem !== '0') {
            acParts.push(`se subchondrálním edémem dřeně (${acEdem})`);
            isAcNormal = false;
        }

        const acOs = ctx.text('sh_ac_os');
        if (acOs && acOs !== '0') {
            if (acOs === 'přítomno') {
                acParts.push('přítomno os acromiale bez edému');
                acConc.push('Os acromiale');
            } else {
                acParts.push('přítomno os acromiale s reaktivním edémem přilehlých kostí (známky instability)');
                acConc.push('Symptomatické os acromiale se známkami instability');
            }
            isAcNormal = false;
        }

        const acImp = ctx.text('sh_ac_impingement');
        if (acImp && acImp !== '0') {
            acParts.push(`${acImp} impingement syndrom s redukcí prostoru pro manžetu`);
            acConc.push(cap(acImp) + ' impingement syndrom');
            isAcNormal = false;
        }

        if (isAcNormal) {
            reportOut.push({ type: 'frame', text: 'Akromion klidné, AC skloubení bez významných degenerativních změn, prostor pod klenbou prostorný.', tableId: 'shoulder_ac_main', dimmed: true });
        } else {
            let acText = 'AC kloub a akromion: ' + acParts.join(', ').replace(/, ([^,]*)$/, ' a $1') + '.';
            reportOut.push({ type: 'frame', text: acText, tableId: 'shoulder_ac_main' });
            acConc.forEach(c => concMain.push({ type: 'frame', text: c + '.', tableId: 'shoulder_ac_main' }));
        }

        // --- 2. GH KLOUB A BURZY ---
        let bursaParts = [];
        let bursaConc = [];
        
        const ghNapln = ctx.text('sh_gh_napln');
        if (ghNapln && ghNapln !== '0') {
            const mapNapln = { '+': 'mírně zvýšené', '++': 'středně zvýšené', '+++': 'výrazně zvýšené' };
            bursaParts.push(`${mapNapln[ghNapln]} množství tekutiny v GH kloubu`);
            bursaConc.push(`${mapNapln[ghNapln]} GH efuze`);
        }

        const ghSasd = ctx.text('sh_gh_sasd');
        if (ghSasd && ghSasd !== '0') {
            if (ghSasd === 'mírná tekutina') bursaParts.push('mírná tekutina v SASD burze');
            else if (ghSasd === 'bursitida') { bursaParts.push('náplň a edém stěn SASD burzy'); bursaConc.push('SASD bursitida'); }
            else if (ghSasd === 'výrazná bursitida') { bursaParts.push('výrazná náplň a zesílení stěn SASD burzy'); bursaConc.push('Výrazná SASD bursitida'); }
        }

        const ghSubcor = ctx.text('sh_gh_subcor');
        if (ghSubcor && ghSubcor !== '0') {
            if (ghSubcor === 'tekutina') bursaParts.push('mírná tekutina v subkorakoidní burze');
            else if (ghSubcor === 'bursitida') { bursaParts.push('náplň a edém stěn subkorakoidní burzy'); bursaConc.push('Subkorakoidní bursitida'); }
        }
        
        const ghSynov = ctx.text('sh_gh_synov');
        if (ghSynov && ghSynov !== '0') {
            if (ghSynov === '+') bursaParts.push('mírná hypertrofie synovie');
            else if (ghSynov === '++') { bursaParts.push('výrazná proliferace synovie'); bursaConc.push('Synovitida GH kloubu'); }
            else if (ghSynov === 'Chondromatóza') { bursaParts.push('v kloubu vícečetná tělíska chondroidního signálu'); bursaConc.push('Synoviální chondromatóza GH kloubu'); }
        }

        if (bursaParts.length === 0) {
            reportOut.push({ type: 'frame', text: 'Kloubní dutina a burzy (SASD, subkorakoidní) bez patologické tekutinové náplně.', tableId: 'shoulder_bursa_main', dimmed: true });
        } else {
            let bursaText = 'Tekutina a burzy: ' + bursaParts.join(', ') + '.';
            reportOut.push({ type: 'frame', text: bursaText, tableId: 'shoulder_bursa_main' });
            bursaConc.forEach(c => concInc.push({ type: 'frame', text: c + '.', tableId: 'shoulder_bursa_main' }));
        }

        // --- 3. ROTÁTOROVÁ MANŽETA ---
        const parseTendon = (prefix, nameTitle, tableId) => {
            const stav = ctx.text(`${prefix}_stav`);
            const retr = ctx.text(`${prefix}_retr`);
            const gout = ctx.text(`${prefix}_gout`);
            const atrofie = ctx.text(`${prefix}_atrofie`);

            let repParts = [];
            let concParts = [];

            if (!stav || stav === '0') {
                if ((gout && gout !== '0') || (atrofie && atrofie !== '0')) {
                    // Stav je sice 0, ale je tam svalová atrofie/degenerace
                } else {
                    return null; // Zcela normální
                }
            }

            // Patologie šlachy
            if (stav && stav !== '0') {
                const repStav = {
                    'tendinóza': 'ztluštění a intrasubstanciální hyperintenzita v T2/PD bez diskontinuity vláken',
                    'parc. art. ruptura': 'částečný defekt vláken ze strany artikulární plochy',
                    'parc. burz. ruptura': 'částečný defekt vláken ze strany burzální plochy',
                    'intrasub. ruptura': 'delaminující tekutinový defekt uvnitř substance šlachy',
                    'kompletní ruptura': 'transmurální defekt s úplným přerušením kontinuity vláken'
                };
                const concStav = {
                    'tendinóza': 'Tendinóza',
                    'parc. art. ruptura': 'Parciální ruptura (artikulární) šlachy m.',
                    'parc. burz. ruptura': 'Parciální ruptura (burzální) šlachy m.',
                    'intrasub. ruptura': 'Intrasubstanciální parciální ruptura šlachy m.',
                    'kompletní ruptura': 'Kompletní ruptura šlachy m.'
                };
                
                repParts.push(repStav[stav]);
                concParts.push(`${concStav[stav]} ${nameTitle}`);
            }

            // Retrakce (Patte)
            if (retr && retr !== '0' && stav === 'kompletní ruptura') {
                const mapRetr = { 'St. 1': 'kousek proximálně od úponu', 'St. 2': 'na úroveň apexu hlavice humeru', 'St. 3': 'na úroveň glenoidu' };
                repParts.push(`pahýl šlachy je retrahován ${mapRetr[retr]} (Patte ${retr.split('.')[1].trim()})`);
                concParts[0] += ` s retrakcí pahýlu (Patte ${retr.split('.')[1].trim()})`;
            }

            // Svalová atrofie a tuková degenerace
            let degenParts = [];
            if (gout && gout !== '0') degenParts.push(`tukovou degenerací (Goutallier ${gout.split('.')[1].trim()})`);
            if (atrofie && atrofie !== '0') degenParts.push(atrofie === '+' ? 'mírnou úbytkem svalové hmoty' : 'výraznou atrofií svalového bříška');
            
            if (degenParts.length > 0) {
                repParts.push('svalové bříško vykazuje patologické změny s ' + degenParts.join(' a '));
                let concAdd = degenParts.join(' a ').replace('mírnou úbytkem', 'mírným úbytkem');
                if (concParts.length > 0) {
                    concMain.push({ type: 'frame', text: `Sekundární svalové změny m. ${nameTitle}: ${concAdd}.`, tableId });
                } else {
                    concParts.push(`Strukturální degenerace svalu m. ${nameTitle} s ${concAdd}`);
                }
            }

            return {
                text: `Šlacha m. ${nameTitle}: ${repParts.join(', ')}.`,
                conc: concParts[0] || '',
                tableId
            };
        };

        const ssp = parseTendon('sh_ssp', 'supraspinatus', 'shoulder_ssp_main');
        const isp = parseTendon('sh_isp', 'infraspinatus', 'shoulder_isp_main');
        const ssc = parseTendon('sh_ssc', 'subscapularis', 'shoulder_ssc_main');

        // Teres minor logic je mírně odlišná (jiná tlačítka)
        let tmText = '';
        let tmConc = '';
        const tmStav = ctx.text('sh_tm_stav');
        const tmGout = ctx.text('sh_tm_gout');
        if ((tmStav && tmStav !== '0') || (tmGout && tmGout !== '0')) {
            let parts = [];
            if (tmStav === 'tendinóza') parts.push('tendinóza šlachy');
            else if (tmStav === 'parc. ruptura') { parts.push('parciální ruptura šlachy'); tmConc = 'Parciální ruptura šlachy m. teres minor'; }
            else if (tmStav === 'kompletní ruptura') { parts.push('kompletní ruptura šlachy'); tmConc = 'Kompletní ruptura šlachy m. teres minor'; }
            
            if (tmGout && tmGout !== '0') {
                parts.push(tmGout === '+' ? 'mírná svalová atrofie' : 'pokročilá tuková degenerace a atrofie');
                if (!tmConc && tmStav === '0') tmConc = 'Atrofie / tuková degenerace m. teres minor';
            }
            tmText = `Šlacha m. teres minor: ${parts.join(', ')}.`;
        }

        let cuffArr = [ssp, isp, ssc, tmText ? { text: tmText, conc: tmConc, tableId: 'shoulder_tm_main' } : null].filter(Boolean);

        if (cuffArr.length === 0) {
            reportOut.push({ type: 'frame', text: 'Rotátorová manžeta (šlachy a svalová bříška m. supraspinatus, infraspinatus, subscapularis a teres minor) přiměřeného průběhu, signálu i morfologie bez detekovatelné trhliny.', tableId: 'shoulder_ssp_main', dimmed: true });
        } else {
            cuffArr.forEach(item => {
                reportOut.push({ type: 'frame', text: item.text, tableId: item.tableId });
                if (item.conc) concMain.push({ type: 'frame', text: item.conc + '.', tableId: item.tableId });
            });
        }

        // --- 4. BICEPS A BICEPSOVÁ KLADKA (LHB) ---
        const lhbStav = ctx.text('sh_lhb_stav');
        const lhbPoloha = ctx.text('sh_lhb_poloha');
        const lhbPulley = ctx.text('sh_lhb_pulley');
        
        let isLhbNormal = (!lhbStav || lhbStav === '0') && (!lhbPoloha || lhbPoloha === 'in situ') && (!lhbPulley || lhbPulley === '0');

        if (isLhbNormal) {
            reportOut.push({ type: 'frame', text: 'Šlacha LHB je in situ v sulku, normální šíře a signálu, bez tekutinového lemu.', tableId: 'shoulder_lhb_main', dimmed: true });
        } else {
            let lhbParts = [];
            let lhbConcs = [];

            if (lhbStav && lhbStav !== '0') {
                if (lhbStav === 'tenosynovitida') { lhbParts.push('s tekutinovým lemem v pochvě (tenosynovitida)'); lhbConcs.push('Tenosynovitida LHB'); }
                else if (lhbStav === 'tendinóza') { lhbParts.push('šlacha je ztluštělá a hyperintenzní'); lhbConcs.push('Tendinóza LHB'); }
                else if (lhbStav === 'parc. ruptura') { lhbParts.push('parciální rozvláknění a defekt šlachy'); lhbConcs.push('Parciální ruptura šlachy LHB'); }
                else if (lhbStav === 'kompletní ruptura') { lhbParts.push('šlacha v sulku chybí, úpon separován s retrakcí pahýlu'); lhbConcs.push('Kompletní ruptura LHB'); }
            }

            if (lhbPoloha && lhbPoloha !== 'in situ' && lhbStav !== 'kompletní ruptura') {
                if (lhbPoloha === 'subluxace') { lhbParts.push('subluxace šlachy nad mediální hranu sulku'); lhbConcs.push('Subluxace šlachy LHB'); }
                else if (lhbPoloha === 'luxace') { lhbParts.push('luxace šlachy LHB mediálně ze sulku'); lhbConcs.push('Luxace šlachy LHB'); }
                else if (lhbPoloha === 'prázdný sulkus') { lhbParts.push('šlacha není v sulku zastižena'); }
            }

            if (lhbPulley && lhbPulley !== '0') {
                lhbParts.push('léze stabilizačního aparátu bicepsové kladky (SGHL/CHL kompexu)');
                lhbConcs.push('Léze bicepsové kladky (pulley lesion)');
            }

            let lhbRepText = 'Šlacha dlouhé hlavy bicepsu (LHB): ';
            if (lhbStav === 'kompletní ruptura') lhbRepText += lhbParts[0] + '.';
            else {
                let statusRep = (lhbStav === '0' || !lhbStav) ? 'šlacha je zachované kontinuity' : lhbParts.shift();
                lhbRepText += statusRep;
                if (lhbParts.length > 0) lhbRepText += ', ' + lhbParts.join(', ');
                lhbRepText += '.';
            }

            reportOut.push({ type: 'frame', text: lhbRepText, tableId: 'shoulder_lhb_main' });
            lhbConcs.forEach(c => concMain.push({ type: 'frame', text: c + '.', tableId: 'shoulder_lhb_main' }));
        }

        // --- 5. LABRUM A LIGAMENTA ---
        const labSup = ctx.text('sh_lab_sup');
        const labAnt = ctx.text('sh_lab_ant');
        const labPos = ctx.text('sh_lab_pos');
        const labCysta = ctx.text('sh_lab_cysta');

        let isLabNormal = (!labSup || labSup === '0') && (!labAnt || labAnt === '0') && 
                          (!labPos || labPos === '0') && (!labCysta || labCysta === '0');

        if (isLabNormal) {
            reportOut.push({ type: 'frame', text: 'Glenoidální labrum celistvé, bez známek separace či defektu.', tableId: 'shoulder_labrum_main', dimmed: true });
        } else {
            let labrep = [];
            let labconc = [];

            if (labSup && labSup !== '0') {
                if (labSup === 'degenerace') { labrep.push('vysoký intrasubstanciální signál horního labra bez volné tekutiny v defektu'); labconc.push('Degenerace horního labra'); }
                else if (labSup.includes('SLAP')) { 
                    labrep.push(`tekutinou vyplněný defekt při horním labru odpovídající ${labSup} lézi`); 
                    labconc.push(`${labSup} léze horního labra`); 
                }
            }

            if (labAnt && labAnt !== '0') {
                if (labAnt === 'degenerace') { labrep.push('změny signálu a tvaru předního labra'); }
                else if (labAnt === 'Bankart') { labrep.push('odtržení předního a dolního labra vč. periostu (Bankartova léze)'); labconc.push('Bankartova léze (přední instabilita)'); }
                else if (labAnt === 'ALPSA') { labrep.push('odtržení předního labra s periostem, labrum je mediálně dislokováno (ALPSA)'); labconc.push('ALPSA léze předního labra'); }
                else if (labAnt === 'Perthes') { labrep.push('částečné odtržení předního labra bez dislokace, s intaktním periostem (Perthes)'); labconc.push('Perthesova léze labra'); }
            }

            if (labPos && labPos !== '0') {
                if (labPos === 'degenerace') labrep.push('degenerativní změny zadního labra');
                else if (labPos === 'Reverse Bankart') { labrep.push('odtržení zadního labra (Reverse Bankart)'); labconc.push('Reverse Bankart léze zadního labra'); }
            }

            if (labCysta && labCysta !== '0') {
                labrep.push(`paralabrální formace laločnatého tekutinového signálu v ${labCysta === 'spinoglenoidní' ? 'incisura spinoglenoidalis' : 'incisura scapulae'}`);
                labconc.push(`Paralabrální cysta v oblasti ${labCysta === 'spinoglenoidní' ? 'incisura spinoglenoidalis (s potenc. tlakem na n. suprascapularis)' : 'supraskapulárního zářezu'}`);
            }

            reportOut.push({ type: 'frame', text: 'Glenoidální labrum: ' + cap(labrep.join('; ')) + '.', tableId: 'shoulder_labrum_main' });
            labconc.forEach(c => concMain.push({ type: 'frame', text: c + '.', tableId: 'shoulder_labrum_main' }));
        }

        // --- 6. SKELET A CHRUPAVKY ---
        const bnHlav = ctx.text('sh_bn_hlav');
        const bnGlen = ctx.text('sh_bn_glen');
        const bnChr = ctx.text('sh_bn_chr');
        const bnLesion = ctx.text('sh_bn_lesion');

        let isBnNormal = (!bnHlav || bnHlav === '0') && (!bnGlen || bnGlen === '0') && 
                         (!bnChr || bnChr === '0') && (!bnLesion || bnLesion === '0');

        if (isBnNormal) {
            reportOut.push({ type: 'frame', text: 'Skelet bez patologických ložiskových změn či posttraumatického edému dřeně, chrupavky normální šíře.', tableId: 'shoulder_bones_main', dimmed: true });
        } else {
            let bnRep = [];
            
            if (bnHlav && bnHlav !== '0') {
                if (bnHlav === 'Hill-Sachs') { bnRep.push('klínovitá impresní zploštění posterolaterální části hlavice humeru (Hill-Sachsův defekt)'); concMain.push({ type: 'frame', text: 'Hill-Sachsův defekt hlavice humeru.', tableId: 'shoulder_bones_main' }); }
                else if (bnHlav === 'kontuzní edém') bnRep.push('posttraumatický reaktivní edém (bone bruise) v oblasti hlavice humeru');
            }

            if (bnGlen && bnGlen !== '0') {
                if (bnGlen === 'Bony Bankart') { bnRep.push('avulzní defekt předního dolního okraje kostního glenoidu (bony Bankart)'); concMain.push({ type: 'frame', text: 'Bony Bankart léze glenoidu.', tableId: 'shoulder_bones_main' }); }
                else if (bnGlen === 'kontuzní edém') bnRep.push('edém kostní dřeně glenoidu');
            }

            if (bnChr && bnChr !== '0') {
                bnRep.push(`chondropatie GH kloubu ${bnChr.replace('Gr. ', 'stupně ')}`);
                concInc.push({ type: 'frame', text: `Osteoartróza a chondropatie GH kloubu (${bnChr}).`, tableId: 'shoulder_bones_main' });
            }

            if (bnLesion && bnLesion !== '0') {
                bnRep.push(`ve skeletu je ložisková změna charakteru ${bnLesion.toLowerCase()}`);
                concInc.push({ type: 'frame', text: `${bnLesion} ve skeletu (vedlejší nález).`, tableId: 'shoulder_bones_main' });
            }

            reportOut.push({ type: 'frame', text: 'Skelet a chrupavky: ' + cap(bnRep.join(', ')) + '.', tableId: 'shoulder_bones_main' });
        }

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};