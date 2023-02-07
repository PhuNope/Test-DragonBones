import { _decorator, Button, Color, Component, dragonBones, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ReplaceSlotDisplay')
export class ReplaceSlotDisplay extends Component {
    @property({ type: dragonBones.ArmatureDisplay })
    armatureDisplay: dragonBones.ArmatureDisplay | null = null;
    @property({ type: dragonBones.ArmatureDisplay })
    replaceArmatureDisplay: dragonBones.ArmatureDisplay | null = null;

    private _armatureDisplay: dragonBones.ArmatureDisplay | null = null;
    //private _characterSlots: dragonBones.Slot[];

    eyesList: dragonBones.DisplayData[] = [];

    //button
    // @property(Button)
    // btnLeft: Button | null = null;
    // @property(Button)
    // btnRight: Button | null = null;

    _eyesSlotView: dragonBones.Slot;

    onLoad() {
        this._armatureDisplay = this.armatureDisplay;
    }

    start() {
        this.replaceArmatureDisplay!.node.active = false;

        //
        let armature = this._armatureDisplay.armature();
        //this._characterSlots = armature.getSlots();

        this._eyesSlotView = armature.getSlot("eyes");

        //let eyesSlotReplace = this.getSlotDataName(this.replaceArmatureDisplay, "eyes");

        //this.eyesList = eyesSlotView._displayDatas;

        // let factory = dragonBones.CCFactory.getInstance();
        // //factory.replaceSlotDisplay(this.replaceArmatureDisplay!.getArmatureKey(),this.replaceArmatureDisplay!.armatureName,"eyes",)
        // factory.replaceSlotDisplayList(this.replaceArmatureDisplay!.getArmatureKey(), this.armatureDisplay!.armatureName, "eyes", this._eyesSlotView);

        armature.invalidUpdate();

        this._eyesSlotView.displayIndex = 2;
    }

    // private getSlotDataName(armatureDisplay: dragonBones.ArmatureDisplay, nameSlot: string): dragonBones.Slot {
    //     let armature = armatureDisplay.armature();
    //     return armature.getSlot(nameSlot);
    // }

    update(deltaTime: number) {

    }

    //event button
    private onLeftButton() {
        if (this._eyesSlotView.displayIndex !== 0) {
            this._eyesSlotView.displayIndex--;
            return;
        }

        let factory = dragonBones.CCFactory.getInstance();
        //factory.replaceSlotDisplay(this.replaceArmatureDisplay!.getArmatureKey(),this.replaceArmatureDisplay!.armatureName,"eyes",)
        factory.replaceSlotDisplayList(this.armatureDisplay!.getArmatureKey(), this.armatureDisplay!.armatureName, "eyes", this._eyesSlotView);
        //save
        this._armatureDisplay.armature().invalidUpdate();

        this.eyesList = this._eyesSlotView._displayDatas;
        let index = this.eyesList.findIndex((value) => { return value.name === "eyes_blank"; });
        this.eyesList.splice(index, 1);

        this._eyesSlotView.displayIndex = this._eyesSlotView._displayDatas.length - 1;

        this._eyesSlotView._setDisplayList;
    }

    private onRightButton() {
        if (this._eyesSlotView.displayIndex !== this._eyesSlotView._displayDatas.length - 1) {
            this._eyesSlotView.displayIndex++;
            return;
        }

        let factory = dragonBones.CCFactory.getInstance();
        //factory.replaceSlotDisplay(this.replaceArmatureDisplay!.getArmatureKey(),this.replaceArmatureDisplay!.armatureName,"eyes",)
        factory.replaceSlotDisplayList(this.replaceArmatureDisplay!.getArmatureKey(), this.replaceArmatureDisplay!.armatureName, "eyes", this._eyesSlotView);
        //save
        this._armatureDisplay.armature().invalidUpdate();

        this.eyesList = this._eyesSlotView._displayDatas;
        let index = this.eyesList.findIndex((value) => { return value.name === "eyes_blank"; });
        this.eyesList.splice(index, 1);

        this._eyesSlotView.displayIndex = 0;
    }

    getSpriteFrameFromSlot(armatureDisplay: dragonBones.ArmatureDisplay, slotName: string): SpriteFrame[] {
        let armature = armatureDisplay!.armature();
        let slot = armature.getSlot(slotName);
        let slotDatas = slot._displayDatas;

        let arrSpriteFrame: SpriteFrame[] = [];

        slotDatas.map((value) => {
            arrSpriteFrame.push(value.texture.spriteFrame);
        });

        return arrSpriteFrame;
    }

    setColorToSlot(slot: dragonBones.Slot, color: Color): void {
        slot._setColor(new dragonBones.ColorTransform(1, color.r / 255, color.g / 255, color.b / 255, 0, 0, 0, 0));
    }

    changeSlot(replaceArmatureDisplay: dragonBones.ArmatureDisplay, curentArmatureDisplay: dragonBones.ArmatureDisplay, nameSlot: string): void {
        let slot = curentArmatureDisplay.armature().getSlot(nameSlot);

        let factory = dragonBones.CCFactory.getInstance();

        factory.replaceSlotDisplayList(replaceArmatureDisplay!.getArmatureKey(), replaceArmatureDisplay!.armatureName, nameSlot, slot);
        //save
        curentArmatureDisplay.armature().invalidUpdate();
    }
}


