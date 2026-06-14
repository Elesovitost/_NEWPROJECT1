(async function initRegionCp() {
    try {
        const response = await fetch('Region_LSp.js');
        let code = await response.text();

        // 1. Změna názvu objektu, titulku a lokálních proměnných
        code = code
            .replace(/const RegionLSp\s*=/g, 'const RegionCp =')
            .replace(/'Bederní páteř'/g, "'Krční páteř'")
            .replace(/lsp_/g, 'cp_')
            .replace(/ls_spine/g, 'c_spine')
            .replace(/spine_lumbar/g, 'spine_cervical')
            .replace(/bederní/gi, 'krční');

        // 2. Skrytí LSTV (robustní odstranění ze záhlaví osy včetně předcházející čárky)
        code = code.replace(/,\s*'LSTV:',\s*\{\s*btn:\s*'lstv',\s*id:\s*'cp_lstv'\s*\}/, '');

        // 3. Textové a medicínské náhrady
        code = code
            .replace(/Zadní stabilizace/g, 'Přední stabilizace')
            .replace(/agregací kaudy/g, 'útlakem míchy')
            .replace(/facetových artróz/g, 'facetových a unkovertebrálních artróz');

        // 4. Přesměrování foraminálních kořenů na novou proměnnou fRoot
        code = code
            .replace(/útlakem kořene \$\{seg\.vLabel\}/g, 'útlakem kořene ${seg.fRoot}')
            .replace(/útlakem kořenů \$\{seg\.vLabel\}/g, 'útlakem kořenů ${seg.fRoot}')
            .replace(/adheze kořenů \$\{seg\.vLabel\}/g, 'adheze kořenů ${seg.fRoot}');

        // 5. Kompletní a klinicky přesný přepis anatomického pole segmentů
        const cervicalSegmentsBlock = `const segments = [
            { label: 'C2/3',  vPfx: 'c2', sPfx: 'c2_3',  vLabel: 'C2', fRoot: 'C3', root: 'C4' },
            { label: 'C3/4',  vPfx: 'c3', sPfx: 'c3_4',  vLabel: 'C3', fRoot: 'C4', root: 'C5' },
            { label: 'C4/5',  vPfx: 'c4', sPfx: 'c4_5',  vLabel: 'C4', fRoot: 'C5', root: 'C6' },
            { label: 'C5/6',  vPfx: 'c5', sPfx: 'c5_6',  vLabel: 'C5', fRoot: 'C6', root: 'C7' },
            { label: 'C6/7',  vPfx: 'c6', sPfx: 'c6_7',  vLabel: 'C6', fRoot: 'C7', root: 'C8' },
            { label: 'C7/T1', vPfx: 'c7', sPfx: 'c7_t1', vLabel: 'C7', fRoot: 'C8', root: 'T1' },
            { label: 'T1/2',  vPfx: 't1', sPfx: 't1_2',  vLabel: 'T1', fRoot: 'T1', root: 'T2' },
            { label: 'T2/3',  vPfx: 't2', sPfx: 't2_3',  vLabel: 'T2', fRoot: 'T2', root: 'T3' }
        ];`;
        code = code.replace(/const segments\s*=\s*\[\s*[\s\S]*?\];/m, cervicalSegmentsBlock);

        // 6. Úprava etáží u expanzí a myelopatií přesně dle požadavků
        code = code.replace(/exp_segment:\s*\{\s*states:\s*\[[\s\S]*?\]\s*\}/, "exp_segment: { states: ['etáž', 'C2/3', 'C3/4', 'C4/5', 'C5/6', 'C6/7', 'C7/T1', 'T1/2'] }");
        code = code.replace(/myelo_level:\s*\{\s*states:\s*\[[\s\S]*?\]\s*\}/, "myelo_level: { states: ['etáž', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'T1', 'T2', 'custom'] }");

        // 7. Masivní přepis segmentů obratlů v textu a ID
        const segmentMap = [
            { from: /L5\/S1/g, to: 'T1/2' }, { from: /l5_s1/g, to: 't1_2' },
            { from: /L4\/5/g, to: 'C7/T1' }, { from: /l4_5/g, to: 'c7_t1' },
            { from: /L3\/4/g, to: 'C6/7' }, { from: /l3_4/g, to: 'c6_7' },
            { from: /L2\/3/g, to: 'C5/6' }, { from: /l2_3/g, to: 'c5_6' },
            { from: /L1\/2/g, to: 'C4/5' }, { from: /l1_2/g, to: 'c4_5' },
            { from: /T12\/L1/g, to: 'C3/4' }, { from: /t12_l1/g, to: 'c3_4' },
            { from: /T11\/12/g, to: 'C2/3' }, { from: /t11_12/g, to: 'c2_3' },
            
            { from: /'S1'/g, to: "'T2'" }, { from: /s1_/g, to: 't2_' },
            { from: /'L5'/g, to: "'T1'" }, { from: /l5_/g, to: 't1_' },
            { from: /'L4'/g, to: "'C7'" }, { from: /l4_/g, to: 'c7_' },
            { from: /'L3'/g, to: "'C6'" }, { from: /l3_/g, to: 'c6_' },
            { from: /'L2'/g, to: "'C5'" }, { from: /l2_/g, to: 'c5_' },
            { from: /'L1'/g, to: "'C4'" }, { from: /l1_/g, to: 'c4_' },
            { from: /'T12'/g, to: "'C3'" }, { from: /t12_/g, to: 'c3_' },
            { from: /'T11'/g, to: "'C2'" }, { from: /t11_/g, to: 'c2_' }
        ];

        segmentMap.forEach(map => {
            code = code.replace(map.from, map.to);
        });

        // 8. Skrytí těla C2 v renderu tabulky (robustní regex ignorující mezery a konce řádků)
        code = code.replace(/\[\s*'C2',\s*\{\s*btn:\s*'shape',\s*id:\s*'c2_shape'[\s\S]*?\]\s*,/g, "// Řádek C2 vynechán");

        // 9. Injektování do DOMu a registrace do globálního objektu REGIONS
        code += "\nif (typeof REGIONS !== 'undefined') { REGIONS['c_spine'] = RegionCp; if (typeof UI !== 'undefined' && Store.activeTab === 'mr_c_patere') { UI.renderDetails(); } }";

        const scriptTag = document.createElement('script');
        scriptTag.textContent = code;
        document.body.appendChild(scriptTag);
        
        console.log('Modul RegionCp byl úspěšně vygenerován s opravenou anatomií kořenů.');
    } catch (error) {
        console.error('Chyba při dynamickém generování krční páteře:', error);
    }
})();