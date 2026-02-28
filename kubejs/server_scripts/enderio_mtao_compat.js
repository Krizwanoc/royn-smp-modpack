ServerEvents.recipes(event => {


    let mtao_metals = [
        "lead", "tungsten", "platinum", "zirconium", "tin", "hyperboreum"
    ];
    let mtao_gems = [
        "tigers_eye", "strebillium", "heliodor", "malachite", "peridot", "hawks_eye", "schorl", "opal"
    ];


    for (var i=0; i<mtao_metals.length; i++) {
        let id = `kubejs:${mtao_metals[i]}_dust`;
        
        event.custom({
            type: "enderio:sag_milling",
            energy: 2400,
            input: {
                tag: `forge:ores/${mtao_metals[i]}`
            },
            outputs: [
                {
                chance: 1.0,
                item: {
                    item: id
                },
                optional: false
                },
                {
                chance: 0.33,
                item: {
                    item: id
                },
                optional: false
                },
                {
                chance: 0.15,
                item: {
                    item: "minecraft:cobblestone"
                },
                optional: false
                }
            ]
        });

        event.smelting("mtao45086:"+mtao_metals[i]+"_ingot", id, 0, 200);
        event.blasting("mtao45086:"+mtao_metals[i]+"_ingot", id, 0, 100);
        event.custom({
            type: "enderio:sag_milling",
            bonus: "none",
            energy: 2400,
            input: {
                item: "mtao45086:"+mtao_metals[i]+"_ingot"
            },
            outputs: [
                {
                chance: 1.0,
                item: {
                    item: id
                },
                optional: false
                }
            ]
        });
        // event.custom({
        //     type: "tconstruct:melting",
        //     ingredient: `#forge:${mtao_metals[i]}_dust`,
        //     result: {
        //         amount: 90,
        //         tag: `forge:molten_${mtao_metals[i]}`
        //     },
        //     temperature: 900,
        //     time: 20*4
        // });
    }

    for (var i=0; i<mtao_gems.length; i++) {
        
        event.custom({
            type: "enderio:sag_milling",
            energy: 2400,
            input: {
                tag: `forge:ores/${mtao_gems[i]}`
            },
            outputs: [
                {
                chance: 1.0,
                item: {
                    count: 2,
                    item: `mtao45086:${mtao_gems[i]}`
                },
                optional: false
                },
                {
                chance: 0.25,
                item: {
                    item: `mtao45086:${mtao_gems[i]}`
                },
                optional: false
                },
                {
                chance: 0.15,
                item: {
                    item: "minecraft:cobblestone"
                },
                optional: false
                }
            ]
        });
    }


})