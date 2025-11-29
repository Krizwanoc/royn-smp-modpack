BlockEvents.rightClicked("obsidian", event => {
    if (event.player.offHandItem == Item.of("flint")) {
        const mainhand = event.player.mainHandItem
        if (
            mainhand == Item.of("deepslate") ||
            mainhand == Item.of("cobbled_deepslate") ||
            mainhand == Item.of("coal")
        ) {
            event.cancel();
        }
    }
})