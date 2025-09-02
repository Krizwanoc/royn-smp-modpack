// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded startup scripts)');

StartupEvents.registry('item', event => {
    event.create("g");
    event.create("unactivated_sculk_transmitter");
    event.create("steel_dust");

    event.create("copper_alloy_dust");
    event.create("energetic_alloy_dust");
    event.create("vibrant_alloy_dust");
    event.create("conductive_alloy_dust");
    event.create("redstone_alloy_dust");
    event.create("pulsating_alloy_dust");
    event.create("dark_steel_dust");
    event.create("end_steel_dust");
    event.create("thallasium_dust");
    // event.create("soularium_dust");

    event.create("aeternium_nugget");
})

StartupEvents.registry("fluid", event => {
      event.create('molten_soularium')
        .thickTexture(0x4f3c16)
        .bucketColor(0x4f3c16)
        .displayName('Molten Soularium');

      event.create('molten_thallasium')
        .thickTexture(0x99d8cb)
        .bucketColor(0x99d8cb)
        .displayName('Molten Thallasium');
      event.create('molten_terminite')
        .thickTexture(0x31bbb0)
        .bucketColor(0x31bbb0)
        .displayName('Molten Terminite');
      event.create('molten_aeternium')
        .thickTexture(0x5e7272)
        .bucketColor(0x5e7272)
        .displayName('Molten Aeternium');

      event.create('molten_adamantite')
        .thickTexture(0x3351e4)
        .bucketColor(0x3351e4)
        .displayName('Molten Adamantite');

      event.create('emerald_water')
        .thinTexture(0x126c4a)
        .bucketColor(0x126c4a)
        .displayName('Emerald Water')
})