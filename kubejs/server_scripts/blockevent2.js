function fuckyou(event) {
    if (event.player.offHandItem == Item.of("flint") && event.player.isCrouching()) {
        const mainhand = event.player.mainHandItem
        if (
            mainhand == Item.of("deepslate") ||
            mainhand == Item.of("cobbled_deepslate") ||
            mainhand == Item.of("coal")
        ) {
            event.cancel();
        }
    }
}

BlockEvents.rightClicked("obsidian", event => {
    fuckyou(event)
})
BlockEvents.rightClicked("crying_obsidian", event => {
    fuckyou(event)
})
BlockEvents.rightClicked("grindstone", event => {
    fuckyou(event)
})