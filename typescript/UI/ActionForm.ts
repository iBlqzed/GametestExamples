import { Player } from "mojang-minecraft"
import { ActionFormData, ActionFormResponse } from "mojang-minecraft-ui";

/**
 * Create a new ActionForm
 */
export class ActionForm {
    /**
     * A new ActionForm!
     */
    constructor() { }
    /**
     * The actual form
     */
    protected form = new ActionFormData()
    /**
     * The form's title
     */
    title: string = 'GUI'
    /**
     * The form's body
     */
    body: string = null
    /**
     * Add a button to the form
     * @param {string} text Text for the button
     * @param {string} iconPath The icon path for the button
     * @example .addButton('Diamond Sword!', 'textures/items/diamond_sword.png')
     */
    addButton(text: string, iconPath?: string): ActionForm {
        this.form.button(text, iconPath)
        return this
    }
    /**
     * Show the form to a player
     * @param {Player} player Player to show the form to
     * @param {(result: ActionFormResponse) => void} callback The code to run when the form is shown
     * @example .show(player, result => {
     * console.warn(result.selection)
     * })
     */
    show(player: Player, callback: (result: ActionFormResponse) => void) {
        this.form.title(this.title)
        this.form.body(this.body)
        this.form.show(player).then(result => callback(result)).catch(e => console.warn(String(e)))
    }
}