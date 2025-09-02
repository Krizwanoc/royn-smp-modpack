// // BlockEvents.rightClicked(event => {
// //     console.log(event.getEntity(), event.getItem(), event.getBlock())
// //     if (event.getItem() == "minecraft:coal" && event.getBlock() == "minecraft:obsidian") {
// //         event.cancel()
// //     }
// // })
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$RightClickBlock', event => {
//   if (event.block == whatever && event.item == "minecraft:coal") {
//     event.cancel()
//   }
    // console.log("useitem "+event.getUseItem())
    const itenStack = event.getItemStack();
    const block = event.getLevel().getBlockState(event.getPos());

    // console.log("itemstack "+event.getItemStack())
    // console.log("useblock "+event.getLevel().getBlockState(event.getPos()))
    // console.log("entity "+event.entity)
})