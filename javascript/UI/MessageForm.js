import { Player } from "mojang-minecraft"
import { MessageFormData, MessageFormResponse } from "mojang-minecraft-ui";

/**
 * Create a new MessageForm
 */
export class MessageForm {
    /**
     * A new MessageForm!
     */
    constructor() {
        /**
         * The actual form
         */
        form = new MessageFormData()
        /**
         * @type {string} The form's title
         */
        this.title = 'GUI'
        /**
         * @type {string} The form's body
         */
        this.body = null
    }
    /**
     * Set the first button of the form
     * @param {string} text Text for the button
     * @example .setButton1('Confirm?')
     */
    setButton1(text) {
        this.form.button1(text)
        return this
    }
    /**
     * Set the second button of the form
     * @param {string} text Text for the button
     * @example .setButton2('Cancel?')
     */
    setButton2(text) {
        this.form.button2(text)
        return this
    }
    /**
     * Show the form to a player
     * @param {Player} player Player to show the form to
     * @param {(result: MessageFormResponse) => void} callback The code to run when the form is shown
     * @example .show(player, result => {
     * console.warn(result.selection)
     * })
     */
    show(player, callback) {
        this.form.title(this.title)
        this.form.body(this.body)
        this.form.show(player).then(result => callback(result)).catch(e => console.warn(String(e)))
    }
}