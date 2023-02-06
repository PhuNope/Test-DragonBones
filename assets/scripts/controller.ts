import { _decorator, Component, dragonBones, Node, SortingLayers, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controller')
export class controller extends Component {
    @property(Node)
    private nodeButton: Node;

    private _spriteButton: Sprite;

    //
    private _armatureDisplay: dragonBones.ArmatureDisplay | null = null;
    private _characterSlots: dragonBones.Slot[];

    hairList: dragonBones.DisplayData[] = [];

    onLoad() {
        this._armatureDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
        this._spriteButton = this.nodeButton.getComponent(Sprite);
    }

    start() {
        let armature = this._armatureDisplay.armature();
        this._characterSlots = armature.getSlots();

        let hairSlot: dragonBones.Slot = this._characterSlots.find((value) => {
            return value.name === "bhair";
        });;

        this.hairList = hairSlot._displayDatas;

        console.log(this.hairList[0].texture.spriteFrame);



        //let a: dragonBones.CCTextureData = this.hairList[0];

        hairSlot._setColor(new dragonBones.ColorTransform(1, 255 / 255, 0 / 255, 0 / 255, 0, 0, 0, 0));

        this._spriteButton.spriteFrame = this.hairList[0].texture.spriteFrame;
    }

    update(deltaTime: number) {

    }

    convertToARGB() {

    }

}


