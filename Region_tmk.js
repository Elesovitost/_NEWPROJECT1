const RegionTmk = {
    title: 'MR TMK',
    reportLayout: 'block',
    layout: (helpers) => {
        return [
            // --- KLOUBNÍ DUTINA ---
            helpers.TableMain('tmk_joint_main', 'Kloubní dutina a Synovie', [
                helpers.Table3colRCL('tmk_jt_table', '', [
                    [ { btn: 'tmk_r_eff', states: ['0', '↑', '↑↑', '↑↑↑'] }, 'Náplň dutiny', { btn: 'tmk_l_eff', states: ['0', '↑', '↑↑', '↑↑↑'] } ],
                    [ { btn: 'tmk_r_syn', type: 'basic', text: '+' }, 'Synovitida', { btn: 'tmk_l_syn', type: 'basic', text: '+' } ],
                    [ { btn: 'tmk_r_caps', type: 'basic', text: '+' }, 'Kapsulitida', { btn: 'tmk_l_caps', type: 'basic', text: '+' } ]
                ])
            ]),

            // --- KONDYL ---
            helpers.TableMain('tmk_condyle_main', 'Kondyl a Chrupavka', [
                helpers.Table3colRCL('tmk_cond_table', '', [
                    [ { btn: 'tmk_r_boneEdema', type: 'basic', text: '+' }, 'Subchondr. edém', { btn: 'tmk_l_boneEdema', type: 'basic', text: '+' } ],
                    [ { btn: 'tmk_r_arthr', states: ['0', 'mírná art.', 'těžká art.'] }, 'Artróza', { btn: 'tmk_l_arthr', states: ['0', 'mírná art.', 'těžká art.'] } ],
                    [ { btn: 'tmk_r_cart', states: ['normální', 'thinning', 'chondromalacie', 'defekt'] }, 'Chrupavka', { btn: 'tmk_l_cart', states: ['normální', 'thinning', 'chondromalacie', 'defekt'] } ],
                    [ { btn: 'tmk_r_condContour', states: ['fyziologická', 'plochá', 'osteofytická', 'deformovaná'] }, 'Kontura kondylu', { btn: 'tmk_l_condContour', states: ['fyziologická', 'plochá', 'osteofytická', 'deformovaná'] } ]
                ])
            ]),

            // --- DISK ---
            helpers.TableMain('tmk_disc_main', 'Disk', [
                helpers.Table3colRCL('tmk_disc_table', '', [
                    [ { btn: 'tmk_r_discPos', states: ['centrická', 'ant. dislokace', 'post. dislokace', 'mediální/laterální'] }, 'Poloha (zavřeno)', { btn: 'tmk_l_discPos', states: ['centrická', 'ant. dislokace', 'post. dislokace', 'mediální/laterální'] } ],
                    [ { btn: 'tmk_r_reduction', states: ['neprovedeno', 's redukcí', 'bez redukce'] }, 'Redukce (otevření)', { btn: 'tmk_l_reduction', states: ['neprovedeno', 's redukcí', 'bez redukce'] } ],
                    [ { btn: 'tmk_r_discMorph', states: ['normální', 'ztenčený', 'deformovaný', 'dysplastický'] }, 'Morfologie', { btn: 'tmk_l_discMorph', states: ['normální', 'ztenčený', 'deformovaný', 'dysplastický'] } ],
                    [ { btn: 'tmk_r_perfor', type: 'basic', text: '+' }, 'Perforace', { btn: 'tmk_l_perfor', type: 'basic', text: '+' } ],
                    [ { btn: 'tmk_r_retroEdema', type: 'basic', text: '+' }, 'Retrodiskální edém', { btn: 'tmk_l_retroEdema', type: 'basic', text: '+' } ]
                ])
            ]),

            // --- FUNKCE ---
            helpers.TableMain('tmk_func_main', 'Funkce a Translace', [
                helpers.Table3colRCL('tmk_func_table', '', [
                    [ { btn: 'tmk_r_translation', states: ['normální', 'omezená', 'hypertranslace'] }, 'Translace', { btn: 'tmk_l_translation', states: ['normální', 'omezená', 'hypertranslace'] } ],
                    [ { btn: 'tmk_r_mobility', states: ['0', 'hypomobilita', 'hypermobilita'] }, 'Hyper/hypomob.', { btn: 'tmk_l_mobility', states: ['0', 'hypomobilita', 'hypermobilita'] } ],
                    [ { btn: 'tmk_r_ankyl', states: ['0', 'fibrotická?', 'kostní?'] }, 'Ankylóza', { btn: 'tmk_l_ankyl', states: ['0', 'fibrotická?', 'kostní?'] } ]
                ])
            ]),

            // --- OSTATNÍ ---
            helpers.TableMain('tmk_other_main', 'Ostatní', [
                helpers.Table1col('tmk_other_add', [
                    { field: 'text', id: 'tmk_desc', placeholder: 'vlastní popis...' },
                    { field: 'text', id: 'tmk_conc', placeholder: 'vlastní závěr...' }
                ])
            ])
        ];
    },

    compile: (ctx) => {
        let reportOut = [{ type: 'heading', text: 'Temporomandibulární klouby (TMK):', action: 'open-region', regionId: 'tmk' }];
        let concMain = [];
        let concInc = []; // Zůstává prázdné pro framework, ale už do něj nic neplníme.
        
        const cap = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);
        const formatZaver = (arr) => arr.map(a => cap(a) + (a.endsWith('.') ? '' : '.')).join(' ');

        const parseSide = (pfx, label) => {
            let rParts = [];
            let cMain = [];

            // 1. Kloubní dutina
            const eff = ctx.text(`tmk_${pfx}_eff`);
            if (eff === '↑') { rParts.push('mírná tekutinová náplň kloubní dutiny'); cMain.push('mírně zmnožená tekutina v kloubu'); }
            else if (eff === '↑↑') { rParts.push('zvýšená tekutinová náplň kloubní dutiny'); cMain.push('zmnožená tekutina v kloubu'); }
            else if (eff === '↑↑↑') { rParts.push('výrazná tekutinová náplň kloubní dutiny s napětím pouzdra'); cMain.push('výrazně zmnožená tekutina v kloubu'); }
            else if (!eff || eff === '0') { rParts.push('bez patologické náplně kloubní dutiny'); }
            
            if (ctx.isActive(`tmk_${pfx}_syn`)) { rParts.push('synoviální ztluštění a zvýšený signál (synovitida)'); cMain.push('synovitida'); }
            if (ctx.isActive(`tmk_${pfx}_caps`)) { rParts.push('ztluštění a sycení pouzdra (kapsulitida)'); cMain.push('kapsulitida'); }

            // 2. Kondyl
            if (ctx.isActive(`tmk_${pfx}_boneEdema`)) { rParts.push('subchondrální edém kondylu/eminence'); cMain.push('subchondrální edém kondylu/eminence'); }
            
            const arthr = ctx.text(`tmk_${pfx}_arthr`);
            if (arthr === 'mírná art.') { rParts.push('osteofytické nárůstky'); cMain.push('mírné artrotické změny'); }
            else if (arthr === 'těžká art.') { rParts.push('výrazné degenerativní změny se sklerotizací'); cMain.push('pokročilé artrotické změny'); }
            
            const cart = ctx.text(`tmk_${pfx}_cart`);
            if (cart === 'thinning') { rParts.push('tenká kloubní chrupavka (thinning)'); cMain.push('ztenčení chrupavky'); }
            else if (cart === 'chondromalacie') { rParts.push('chondromalacie chrupavky'); cMain.push('chondromalacie'); }
            else if (cart === 'defekt') { rParts.push('ohraničený defekt chrupavky'); cMain.push('defekt chrupavky'); }
            else if (cart === 'normální') { rParts.push('kloubní chrupavka obvyklé tloušťky a signálu'); }
            
            const cont = ctx.text(`tmk_${pfx}_condContour`);
            if (cont === 'plochá') { rParts.push('zploštění kontury kondylu'); }
            else if (cont === 'osteofytická') { rParts.push('osteofytické změny kontury kondylu'); }
            else if (cont === 'deformovaná') { rParts.push('deformovaná kontura kondylu'); cMain.push('deformace kondylu'); }
            
            // 3. Disk
            const dPos = ctx.text(`tmk_${pfx}_discPos`);
            const dRed = ctx.text(`tmk_${pfx}_reduction`);
            if (dPos === 'ant. dislokace') {
                if (dRed === 's redukcí') { rParts.push('anteriorní dislokace disku v uzavření, s redukcí při otevření'); cMain.push('anteriorní dislokace disku s redukcí při otevření'); }
                else if (dRed === 'bez redukce') { rParts.push('anteriorní dislokace disku v uzavření, bez redukce při otevření'); cMain.push('anteriorní dislokace disku bez redukce při otevření'); }
                else { rParts.push('anteriorní dislokace disku v uzavření'); cMain.push('anteriorní dislokace disku'); }
            } else if (dPos === 'post. dislokace') { rParts.push('posteriorní dislokace disku'); cMain.push('posteriorní dislokace disku'); }
            else if (dPos === 'mediální/laterální') { rParts.push('mediolaterální komponenta dislokace disku'); cMain.push('mediolaterální dislokace disku'); }
            else { rParts.push('disk v centrální pozici v uzavření'); }
            
            const dMorph = ctx.text(`tmk_${pfx}_discMorph`);
            if (dMorph === 'ztenčený') { rParts.push('disk je ztenčený'); cMain.push('ztenčení disku'); }
            else if (dMorph === 'deformovaný') { rParts.push('disk deformovaný (bikonvexní tvar)'); cMain.push('deformace disku'); }
            else if (dMorph === 'dysplastický') { rParts.push('disk dysplastického tvaru'); cMain.push('dysplazie disku'); }
            
            if (ctx.isActive(`tmk_${pfx}_perfor`)) { rParts.push('suspektní perforace disku'); cMain.push('suspektní perforace disku'); }
            if (ctx.isActive(`tmk_${pfx}_retroEdema`)) { rParts.push('edém či zánětlivé sycení retrodiskální tkáně'); cMain.push('edém retrodiskální tkáně'); }

            // 4. Funkce
            const transl = ctx.text(`tmk_${pfx}_translation`);
            if (transl === 'omezená') { rParts.push('omezená translace při otevření'); cMain.push('omezená translace'); }
            else if (transl === 'hypertranslace') { rParts.push('hypertranslace při otevření'); cMain.push('hypertranslace'); }
            
            const mob = ctx.text(`tmk_${pfx}_mobility`);
            if (mob === 'hypomobilita') { rParts.push('MR známky hypomobility'); cMain.push('hypomobilita'); }
            else if (mob === 'hypermobilita') { rParts.push('MR známky hypermobility'); cMain.push('hypermobilita'); }
            
            const ankyl = ctx.text(`tmk_${pfx}_ankyl`);
            if (ankyl === 'fibrotická?') { rParts.push('možná fibrotická ankylóza'); cMain.push('suspektní fibrotická ankylóza (korelace klinicky)'); }
            else if (ankyl === 'kostní?') { rParts.push('možná kostní ankylóza'); cMain.push('suspektní kostní ankylóza (korelace s CT)'); }

            const reportStr = rParts.length ? `${label} TMK: ${cap(rParts.join('; '))}.` : null;
            
            return {
                report: reportStr,
                main: cMain.length ? `${label} TMK: ${formatZaver(cMain)}` : null,
                hasPathology: cMain.length > 0
            };
        };

        const right = parseSide('r', 'Pravý');
        const left = parseSide('l', 'Levý');

        // Report output (vždy se generuje pravá a levá strana zvlášť)
        if (right.report) reportOut.push({ type: 'frame', text: right.report, tableId: 'tmk_joint_main' });
        if (left.report) reportOut.push({ type: 'frame', text: left.report, tableId: 'tmk_joint_main' });
        
        const desc = ctx.field('tmk_desc');
        if (desc) reportOut.push({ type: 'frame', text: desc, tableId: 'tmk_other_main' });

        // Conclusion output
        if (!right.hasPathology && !left.hasPathology) {
            concMain.push({ type: 'frame', text: 'Přiměřený nález oboustranně bez signifikantní patologie.', tableId: 'tmk_joint_main' });
        } else {
            // Pravý TMK
            if (right.hasPathology) {
                concMain.push({ type: 'frame', text: right.main, tableId: 'tmk_joint_main' });
            } else {
                concMain.push({ type: 'frame', text: 'Pravý TMK: bez signifikantní patologie.', tableId: 'tmk_joint_main' });
            }
            // Levý TMK
            if (left.hasPathology) {
                concMain.push({ type: 'frame', text: left.main, tableId: 'tmk_joint_main' });
            } else {
                concMain.push({ type: 'frame', text: 'Levý TMK: bez signifikantní patologie.', tableId: 'tmk_joint_main' });
            }
        }

        const conc = ctx.field('tmk_conc');
        if (conc) concMain.push({ type: 'frame', text: cap(conc) + (conc.endsWith('.') ? '' : '.'), tableId: 'tmk_other_main' });

        return { report: reportOut, conclusion: { main: concMain, incidental: concInc } };
    }
};