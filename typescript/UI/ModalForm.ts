import { Player } from "mojang-minecraft";
import { ModalFormData, ModalFormResponse } from "mojang-minecraft-ui";

/**
 * Create a new ModalForm
 */
export class ModalForm {
    /**
     * A new ModalForm!
     */
    constructor() { }
    /**
     * The actual form
     */
    protected form = new ModalFormData()
    /**
     * The form's title
     */
    title: string = 'GUI'
    /**
     * Add a dropdown to the form
     * @param {string} label The label of the dropdown
     * @param {string[]} options The dropdown options
     * @param {number} defaultIndex The index of the value which will be set by default
     * @returns {ModalForm} The modal form
     * @example .addDropdown('My dropdown', ['Option 1', 'Option 2'], 0)
     */
    addDropdown(label: string, options: string[], defaultIndex?: number): ModalForm {
        this.form.dropdown(label, options, defaultIndex)
        return this
    }
    /**
     * Add an icon to the form
     * @param {string} iconPath The icon path
     * @returns {ModalForm} The modal form
     * @example .addIcon('textures/items/diamond_sword.png')
     */
    addIcon(iconPath: string): ModalForm {
        this.form.icon(iconPath)
        return this
    }
    /**
     * Add a slider to the form
     * @param {string} label The label for the slider
     * @param {number} minimumValue The minimum value of the slider
     * @param {number} maximumValue The maximum value of the slider
     * @param {number} valueStep The value step of the slider
     * @param {number} defaultValue The default value of the slider
     * @returns {ModalForm} The modal form
     * @example .addSlider('Choose a number', 0, 100, 1, 0)
     */
    addSlider(label: string, minimumValue: number, maximumValue: number, valueStep: number, defaultValue?: number): ModalForm {
        this.form.slider(label, minimumValue, maximumValue, valueStep, defaultValue)
        return this
    }
    /**
     * Add a text field to the form
     * @param {string} label The label of the text field
     * @param {string} placeholderText The placeholder text for the text field
     * @param {string} defaultValue The default value of the modal form
     * @returns {ModalForm} The modal form
     * @example .addTextField('Write something about yourself', 'Write here...')
     */
    addTextField(label: string, placeholderText: string, defaultValue?: string): ModalForm {
        this.form.textField(label, placeholderText, defaultValue)
        return this
    }
    /**
     * Add a toggle to the form
     * @param {string} label The label of the toggle
     * @param {boolean} defaultValue The default value of the toggle
     * @returns {ModalForm} The modal form
     * @example .addToggle('Are you cool?', true)
     */
    addToggle(label: string, defaultValue?: boolean): ModalForm {
        this.form.toggle(label, defaultValue)
        return this
    }
    /**
     * Show the form to a player
     * @param {Player} player Player to show the form to
     * @param {(response: ModalFormResponse) => void} callback Code to run when the form is shown
     * @example .show(player, result => {
     * console.warn(JSON.stringify(result.formValues))
     * })
     */
    show(player: Player, callback: (result: ModalFormResponse) => void) {
        this.form.title(this.title)
        this.form.show(player).then(result => callback(result)).catch(e => console.warn(`${String(e)}`))
    }
}