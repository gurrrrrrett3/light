export namespace light {

    export namespace client {
        /**
        * This function will initialize light's core functions. You'll need to call it to start sending messages on the client or server. Calling multiple times or from multiple files has no additional effects, and is considered "safe".
        * ### sync
        * https://light.ardi.gg/api/begin_replication/
        */
        function begin_replication(): void;

        /**
        * 
        * Containers are the recommended and easy way to group together messages in light by name.
        * 
        * Container inputs should be a map of string message-names to any valid Datatype. This includes Datatypes like arrays or maps that are defined with luau tables. I.e., { light.u8 }
        * ### sync • yielding
        * https://light.ardi.gg/api/network/messages/creation/container/
        */
        function container<T>(
            message_names: T,
            namespace?: string
        ): T

        /**
         * Message does the same thing as a {@link light.client.container()}, but doesn't force you to put it in a string map.
         * ### sync • yielding
         * https://light.ardi.gg/api/network/messages/creation/message/
         */
        function message<T>(
            name: string,
            template: T,
        ): T;

        /**
        * Identical behavior to {@link light.client.send()}, except the message is [unreliable](https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent). There is no size limit on light unreliable sending—however, sending [instances](https://light.ardi.gg/api/datatypes/instances/) / [any](https://light.ardi.gg/api/datatypes/any/) / [checked](https://light.ardi.gg/api/datatypes/checked/) can cause it to exceed size thresholds and fail to send.
         * 
         * ### sync
         * https://light.ardi.gg/api/network/messages/sending/send/ 
         */
        function send<T>(
            message: T,
            data: T
        ): void

        function send_unreliably<T>(
            message: T,
            data: T
        ): void

        /**
         * Connect sets a callback for a given message when it is sent. A message can only have one connection, but you can always connect your messages into a choice signal implementation. Callbacks can be removed with {@link light.client.disconnect()}. Message callbacks will be spawned asynchronously with thread reuse, to create a non-yielding callback you can use {@link light.client.connect_sync()}
        * 
        * @warning This function can error if there is already a callback connected.
        * 
        * Consider calling {@link light.client.disconnect()} first if this is an issue.
        * ### sync • errors
        * https://light.ardi.gg/api/network/messages/listening/connect/
        */
        function connect<T>(
            message: T,
            callback: (data: T) => void
        ): void

        /**
         * You can use this to remove a callback from a message. {@link light.client.disconnect()} returns the old callback if there was one.
         * ### sync 
         * https://light.ardi.gg/api/network/messages/listening/disconnect/
         */
        function disconnect<T>(
            message: T
        ): ((data: T) => void) | undefined

        /**
         * There is little to no downside of using {@link light.client.connect()}, this function exists for optimizing frequently sent messages in potentially large servers (or for optimizing memory usage.) If that's not you, you should skip this page.
         * 
         * {@link light.client.connect_sync()} does the same thing as {@link light.client.connect()} with one major difference. Thread reuse will not be used with {@link light.client.connect_sync()}, and the function will be called directly. This means if you yield in your callback, you could get a buffer access out of bounds or cause other unexpected internal issues. If you don't know what that implies, use {@link light.client.connect()}.
         * 
         * @warning This function can error if there is already a callback connected.
         * 
         * Consider calling {@link light.client.disconnect()} first if this is an issue.
         * ### sync • errors
         * https://light.ardi.gg/api/network/messages/listening/connect_sync/
         */
        function connect_sync<T>(
            message: T,
            callback: (data: T) => void
        ): void

        /**
         * This function will step the network batch.
         * ### sync
         * https://light.ardi.gg/api/step_replication/
         */
        function step_replication(): void

        const datatypes: datatypes;
    }

    export namespace server {
        /**
        * This function will initialize light's core functions. You'll need to call it to start sending messages on the client or server. Calling multiple times or from multiple files has no additional effects, and is considered "safe".
        * ### sync
        * https://light.ardi.gg/api/begin_replication/
        */
        function begin_replication(): void;

        /**
        * 
        * Containers are the recommended and easy way to group together messages in light by name.
        * 
        * Container inputs should be a map of string message-names to any valid Datatype. This includes Datatypes like arrays or maps that are defined with luau tables. I.e., { light.u8 }
        * ### sync • yielding
        * https://light.ardi.gg/api/network/messages/creation/container/
        */
        function container<T>(
            message_names: T,
            namespace?: string
        ): T

        /**
        * Message does the same thing as a {@link light.client.container()}, but doesn't force you to put it in a string map.
        * 
        * ### sync
        * https://light.ardi.gg/api/network/messages/creation/message/
        */
        function message<T>(
            name: string,
            template: T,
        ): T;

        /**
         * To send messages to multiple people on the server, check out {@link light.server.broadcast()}.
        * 
        * ### sync
        * https://light.ardi.gg/api/network/messages/sending/send/
        */
        function send<T>(
            message: T,
            to: Player,
            data: T
        ): void

        /**
         * {@link light.server.broadcast()} will send a message to a list of players on the server.
         * 
         * To send to an individual, check out {@link light.server.send()}
         * ### sync
         * https://light.ardi.gg/api/network/messages/sending/broadcast/
         */
        function broadcast<T>(
            message: T,
            to: Player[],
            data: T
        ): void

        /**
         * {@link light.server.broadcast_to_all()} sends a message to all players who are ingame when the network batch is stepped.
         * ### sync
         * https://light.ardi.gg/api/network/messages/sending/broadcast_to_all/
         */
        function broadcast_to_all<T>(
            message: T,
            data: T
        ): void

        /**
         * Broadcast To All Except is identical to calling {@link light.server.broadcast()} to all players except a player or list of players.
         * ### sync
         * https://light.ardi.gg/api/network/messages/sending/broadcast_to_all_except/
         */
        function broadcast_to_all_except<T>(
            message: T,
            except: Player[] | Player,
            data: T
        ): void

        /**
         * Identical behavior to {@link light.server.send()}, except the message is [unreliable](https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent). There is no size limit on light unreliable sending—however, sending [instances](https://light.ardi.gg/api/datatypes/instances/) / [any](https://light.ardi.gg/api/datatypes/any/) / [checked](https://light.ardi.gg/api/datatypes/checked/) can cause it to exceed size thresholds and fail to send.
         * 
         * To send unreliable messages to multiple people on the server, check out {@link light.server.broadcast_unreliably()}.
         * ### sync 
         * https://light.ardi.gg/api/network/messages/sending/send_unreliably/
         */
        function send_unreliably<T>(
            message: T,
            to: Player,
            data: T
        ): void

        /**
         * {@link light.server.broadcast_unreliably()}
         * 
         * Identical behavior to {@link light.server.broadcast()}, except the message is unreliable. There is no size limit on light unreliable sending—however, sending [instances](https://light.ardi.gg/api/datatypes/instances/) / [any](https://light.ardi.gg/api/datatypes/any/) / [checked](https://light.ardi.gg/api/datatypes/checked/) can cause it to exceed size thresholds and fail to send.
         * ### sync
         * https://light.ardi.gg/api/network/messages/sending/broadcast_unreliably/
         */
        function broadcast_unreliably<T>(
            message: T,
            to: Player[],
            data: T
        ): void

        /**
         * Identical behavior to {@link light.server.broadcast_to_all()}, except the message is unreliable. There is no size limit on light unreliable sending—however, sending [instances](https://light.ardi.gg/api/datatypes/instances/) / [any](https://light.ardi.gg/api/datatypes/any/) / [checked](https://light.ardi.gg/api/datatypes/checked/) can cause it to exceed size thresholds and fail to send.
         */
        function broadcast_unreliably_to_all<T>(
            message: T,
            data: T
        ): void

        /**
         * Identical behavior to {@link light.server.broadcast_to_all_except()}, except the message is unreliable. There is no size limit on light unreliable sending—however, sending [instances](https://light.ardi.gg/api/datatypes/instances/) / [any](https://light.ardi.gg/api/datatypes/any/) / [checked](https://light.ardi.gg/api/datatypes/checked/) can cause it to exceed size thresholds and fail to send.
         */
        function broadcast_unreliably_to_all_except<T>(
            message: T,
            except: Player[] | Player,
            data: T
        ): void

        /**
        * Connect sets a callback for a given message when it is sent. A message can only have one connection, but you can always connect your messages into a choice signal implementation. Callbacks can be removed with {@link light.server.disconnect()}. Message callbacks will be spawned asynchronously with thread reuse, to create a non-yielding callback you can use {@link light.server.connect_sync()}
        * 
        * @warning This function can error if there is already a callback connected.
        * 
        * Consider calling {@link light.server.disconnect()} first if this is an issue.
        * 
        * ### sync • errors
        * https://light.ardi.gg/api/network/messages/listening/connect/
        */
        function connect<T>(
            message: T,
            callback: (player: Player, data: T) => void
        ): void

        /**
        * You can use this to remove a callback from a message. {@link light.server.disconnect()} returns the old callback if there was one.
        * ### sync 
        * https://light.ardi.gg/api/network/messages/listening/disconnect/
        */
        function disconnect<T>(
            message: T
        ): ((player: Player, data: T) => void) | undefined

        /**
         * There is little to no downside of using {@link light.server.connect()}, this function exists for optimizing frequently sent messages in potentially large servers (or for optimizing memory usage.) If that's not you, you should skip this page.
         * 
         * {@link light.server.connect_sync()} does the same thing as {@link light.server.connect()} with one major difference. Thread reuse will not be used with {@link light.server.connect_sync()}, and the function will be called directly. This means if you yield in your callback, you could get a buffer access out of bounds or cause other unexpected internal issues. If you don't know what that implies, use {@link light.server.connect()}.
         * 
         * @warning This function can error if there is already a callback connected.
         * 
         * Consider calling {@link light.server.disconnect()} first if this is an issue.
         * ### sync • errors
         * https://light.ardi.gg/api/network/messages/listening/connect_sync/
         */
        function connect_sync<T>(
            message: T,
            callback: (data: T) => void
        ): void

        /**
        * This function will step the network batch.
        * ### sync
        * https://light.ardi.gg/api/step_replication/
        */
        function step_replication(): void

        const datatypes: datatypes;
    }

    export namespace shared {
        /**
        * This function will initialize light's core functions. You'll need to call it to start sending messages on the client or server. Calling multiple times or from multiple files has no additional effects, and is considered "safe".
        * 
        * ### sync
        * https://light.ardi.gg/api/begin_replication/
        */
        function begin_replication(): void;

        /**
        * This function will step the network batch.
        * ### sync
        * https://light.ardi.gg/api/step_replication/
        */
        function step_replication(): void

        const datatypes: datatypes;

    }

}

// util types JUST for enum
type TaggedEnum<Tag extends string, IdentifierMap extends Record<string, any>> = {
    [K in keyof IdentifierMap]: IdentifierMap[K] extends Record<string, any>
    ? IdentifierMap[K] & { [P in Tag]: K }
    : never;
}[keyof IdentifierMap];


/**
 * https://light.ardi.gg/api/datatypes/
 */
type datatypes = {
    u8: number;
    u16: number;
    u24: number;
    u32: number;
    u40: number;
    u48: number;
    u56: number;
    i8: number;
    i16: number;
    i24: number;
    i32: number;
    i40: number;
    i48: number;
    i53: number;
    f32: number;
    f64: number;

    /**
     * Arrays are quite simple.
     * 
     * Arrays in light represent a contiguous list of "things", just like luau.
     * 
     * An example of a contiguous array value would be `["Hello", " ", "World!"]`. It shouldn't have any undefines or "gaps", unless the [Datatype](https://light.ardi.gg/api/datatypes/) provided is optional. If you want holes in your array, use [Maps](https://light.ardi.gg/api/datatypes/generics/tables/map/), or [Optional Values](https://light.ardi.gg/api/datatypes/generics/optional/).
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/tables/arr/
     */
    arr: <Item>(
        item: Item,
        length?: number
    ) => Item[];

    /**
     * Maps (a.k.a. Dictionaries) are quite simple.
     * Maps in light represent the ts type: `Map<Key, Value>`.
     *
     * You can define a valid map [Datatype](https://light.ardi.gg/api/datatypes/) using a simple table, just like luau:
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/tables/map/
     */
    map: <Key, Value>(
        key: Key,
        value: Value,
        length?: number
    ) => Map<Key, Value>;

    /**
     * Structs are quite simple.
     * Structs in light are a fixed set of string keys and values.
     * Structs are not guaranteed to have the field order you defined them with, but ordering is identical on client and server. They can also be assumed to be the same order for every struct with the exact same keys and values provided, even if they're provided in different orders.
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/tables/struct/
     */
    struct: <T>(
        map: T & { [key: string]: any }
    ) => T

    /**
     * Optionals represent a value which could be `undefined`.
     * ## sync
     * https://light.ardi.gg/api/datatypes/generics/optional/
     */
    optional: <T>(
        inner: T
    ) => T | undefined

    /**
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/str/
     * @param length defaults to {@link light.shared.datatypes.vlq}
     */
    str: (
        length?: number
    ) => string

    /**
     * [Variable Length Quantities](https://en.wikipedia.org/wiki/Variable-length_quantity) allow you to encode a number which takes more space as it gets bigger.
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/vlq/
     */
    vlq: (
        max_bytes?: number
    ) => number

    /**
     * Returns a number [Datatype](https://light.ardi.gg/api/datatypes/) which clamps to the given range. Minimum can be negative. The range clamping is fully validated.
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/range/
     */
    range: (
        minimum: number,
        maximum: number,
    ) => number

    /** 
     * {@link light.shared.datatypes.vect3()} is a 3-wide constructed [luau `vector`](https://luau.org/typecheck#builtin-types) [Datatype](https://light.ardi.gg/api/datatypes/).
     * 
     * @param coord  defines how each coordinate of {@link light.shared.datatypes.vect3()} will be encoded. If left unselected, it will choose float32 by default. Luau does not represent floats beyond f32 in vectors, so using a f64 for this would be wasteful.
     * 
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/vect3/
    */
    vect3: (
        coord?: number
    ) => Vector3

    /**
     * {@link light.shared.datatypes.vect2()} is a constructed [luau `vector`](https://luau.org/typecheck#builtin-types) [Datatype](https://light.ardi.gg/api/datatypes/). This is not to be confused with {@link light.shared.datatypes.roblox_vect2()}, the Roblox Datatype.
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/roblox_vect2/ 
    */
    vect2: (
        coord?: number
    ) => Vector2

    /**
     * An enum represents a set of possible values. Because of limitations with string types, to get full type info from some enums you will need to [typecast](https://luau.org/typecheck#type-casts) into a [string singleton type](https://luau.org/typecheck#singleton-types-aka-literal-types).
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/enums/
     */
    enum: (<Identifier>(
        identifiers: Identifier[],
    ) => Identifier)
    & (<IdentifierName extends string, IdentifierMap extends Record<string, any>>(
        tag_name: IdentifierName & string,
        datatypes: IdentifierMap,
    ) => TaggedEnum<IdentifierName, IdentifierMap>)

    /**
     * Literals represent a value which is "literally" something. Pass in any valid luau value, and it'll be seen as a constant costing zero bytes.
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/literal/
     */
    literal: <T>(
        value: T
    ) => T

    /**
     * In light, you can use luau [arrays](https://light.ardi.gg/api/datatypes/generics/tables/arr/), [maps](https://light.ardi.gg/api/datatypes/generics/tables/map/), and [structs](https://light.ardi.gg/api/datatypes/generics/tables/struct/) to define a message [Datatype](https://light.ardi.gg/api/datatypes/).
     * 
     * This API exists to cache the result of a [Datatype](https://light.ardi.gg/api/datatypes/). This will internally turn it into a numeric ID if it isn't one already, rendering it unusable for anything other than ser/des and messages. Messages cache their (Datatypes)[https://light.ardi.gg/api/datatypes/] automatically, but this can be useful in conjunction with other features like (Computed Datatypes)[https://light.ardi.gg/api/datatypes/generics/computed/].
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/cached/
     */
    cached: <T>(
        value: T
    ) => T

    /**
     * [Computed Datatypes](https://light.ardi.gg/api/datatypes/generics/computed/) are similar to {@link light.shared.datatypes.literal()} and {@link light.shared.datatypes.enum()}, except they are a function which returns a [Datatype](https://light.ardi.gg/api/datatypes/). They are mostly useful for [LinkedList](https://en.wikipedia.org/wiki/Linked_list), and are best paired with [Cached Datatypes](https://light.ardi.gg/api/datatypes/generics/cached/).
     * ### Introducing external conditionality to serialization / deserialization can be dangerous. Please be careful.
     * ### You should never yield from within `datatypes.computed()`'s lambda callback(s).
     * This is considered undefined behavior.
     * ### You should never send any message from within `datatypes.computed()`'s lambda callback(s).
     * This is considered undefined behavior.
     * ### `datatypes.computed()` allows for recursive types.
     * If you pass a self-referential table, serialization may hang forever.
     * ### No implicit declarations
     * [Returning](https://en.wikipedia.org/wiki/Return_statement) implicit [declarations](https://en.wikipedia.org/wiki/Declaration_(computer_programming)), [such](https://www.merriam-webster.com/dictionary/such) as [Table Syntax](https://light.ardi.gg/api/datatypes/generics/tables/) will not [work](https://www.bonesafety.com/products/road-work-ahead-rus). You must [return](https://en.wikipedia.org/wiki/Return_statement) an explicitly defined [Datatype](https://light.ardi.gg/api/datatypes/)
     * ### sync • experimental
     * https://light.ardi.gg/api/datatypes/generics/computed/
     */
    computed: <Output>(
        lambda: () => Output
    ) => Output

    /**
     * @param length defaults to {@link light.shared.datatypes.vlq}
     * ### sync
     * https://light.ardi.gg/api/datatypes/generics/buff/
     */
    buff: (
        length?: number
    ) => buffer

}

// commented out instances which do not have available types in roblox-ts
type instances = {
    Instance: Instance
    AccessoryDescription: AccessoryDescription
    Accoutrement: Accoutrement
    Accessory: Accessory
    Hat: Hat
    ActivityHistoryEventService: ActivityHistoryEventService
    AdPortal: AdPortal
    // AdService: AdService
    // AdvancedDragger: AdvancedDragger
    Animation: Animation
    AnimationClip: AnimationClip
    CurveAnimation: CurveAnimation
    KeyframeSequence: KeyframeSequence
    AnimationController: AnimationController
    AnimationFromVideoCreatorService: AnimationFromVideoCreatorService
    AnimationRigData: AnimationRigData
    AnimationTrack: AnimationTrack
    Animator: Animator
    Annotation: Annotation
    WorkspaceAnnotation: WorkspaceAnnotation
    AnnotationsService: AnnotationsService
    AssetService: AssetService
    Atmosphere: Atmosphere
    Attachment: Attachment
    Bone: Bone
    AudioAnalyzer: AudioAnalyzer
    AudioChannelMixer: AudioChannelMixer
    AudioChannelSplitter: AudioChannelSplitter
    AudioChorus: AudioChorus
    AudioCompressor: AudioCompressor
    AudioDeviceInput: AudioDeviceInput
    AudioDeviceOutput: AudioDeviceOutput
    AudioDistortion: AudioDistortion
    AudioEcho: AudioEcho
    AudioEmitter: AudioEmitter
    AudioEqualizer: AudioEqualizer
    AudioFader: AudioFader
    AudioFilter: AudioFilter
    AudioFlanger: AudioFlanger
    AudioLimiter: AudioLimiter
    AudioListener: AudioListener
    AudioPitchShifter: AudioPitchShifter
    AudioPlayer: AudioPlayer
    AudioReverb: AudioReverb
    AudioTextToSpeech: AudioTextToSpeech
    AuroraScriptService: AuroraScriptService
    AuroraService: AuroraService
    AvatarChatService: AvatarChatService
    AvatarCreationService: AvatarCreationService
    Backpack: Backpack
    BadgeService: BadgeService
    BasePlayerGui: BasePlayerGui
    PlayerGui: PlayerGui
    StarterGui: StarterGui
    BaseRemoteEvent: BaseRemoteEvent
    RemoteEvent: RemoteEvent
    UnreliableRemoteEvent: UnreliableRemoteEvent
    BaseWrap: BaseWrap
    WrapDeformer: WrapDeformer
    WrapLayer: WrapLayer
    WrapTarget: WrapTarget
    Beam: Beam
    BindableEvent: BindableEvent
    BindableFunction: BindableFunction
    BodyMover: BodyMover
    BodyAngularVelocity: BodyAngularVelocity
    BodyForce: BodyForce
    BodyGyro: BodyGyro
    BodyPosition: BodyPosition
    BodyThrust: BodyThrust
    BodyVelocity: BodyVelocity
    RocketPropulsion: RocketPropulsion
    BodyPartDescription: BodyPartDescription
    CaptureService: CaptureService
    // ChangeHistoryService: ChangeHistoryService
    CharacterAppearance: CharacterAppearance
    BodyColors: BodyColors
    CharacterMesh: CharacterMesh
    Clothing: Clothing
    Pants: Pants
    Shirt: Shirt
    ShirtGraphic: ShirtGraphic
    // Skin: Skin
    ClickDetector: ClickDetector
    DragDetector: DragDetector
    Clouds: Clouds
    Collaborator: Collaborator
    CollaboratorsService: CollaboratorsService
    CollectionService: CollectionService
    CommerceService: CommerceService
    Configuration: Configuration
    ConfigureServerService: ConfigureServerService
    Constraint: Constraint
    AlignOrientation: AlignOrientation
    AlignPosition: AlignPosition
    AngularVelocity: AngularVelocity
    AnimationConstraint: AnimationConstraint
    BallSocketConstraint: BallSocketConstraint
    HingeConstraint: HingeConstraint
    LineForce: LineForce
    LinearVelocity: LinearVelocity
    PlaneConstraint: PlaneConstraint
    Plane: Plane
    RigidConstraint: RigidConstraint
    RodConstraint: RodConstraint
    RopeConstraint: RopeConstraint
    SlidingBallConstraint: SlidingBallConstraint
    CylindricalConstraint: CylindricalConstraint
    PrismaticConstraint: PrismaticConstraint
    SpringConstraint: SpringConstraint
    Torque: Torque
    TorsionSpringConstraint: TorsionSpringConstraint
    UniversalConstraint: UniversalConstraint
    VectorForce: VectorForce
    ContextActionService: ContextActionService
    Controller: Controller
    HumanoidController: HumanoidController
    SkateboardController: SkateboardController
    VehicleController: VehicleController
    ControllerBase: ControllerBase
    AirController: AirController
    ClimbController: ClimbController
    GroundController: GroundController
    SwimController: SwimController
    ControllerManager: ControllerManager
    // CookiesService: CookiesService
    CoreScriptDebuggingManagerHelper: CoreScriptDebuggingManagerHelper
    CreatorStoreService: CreatorStoreService
    // CustomEvent: CustomEvent
    // CustomEventReceiver: CustomEventReceiver
    DataModelMesh: DataModelMesh
    BevelMesh: BevelMesh
    BlockMesh: BlockMesh
    CylinderMesh: CylinderMesh
    FileMesh: FileMesh
    SpecialMesh: SpecialMesh
    // DataModelSession: DataModelSession
    Debris: Debris
    // DebuggerBreakpoint: DebuggerBreakpoint
    // DebuggerWatch: DebuggerWatch
    Dialog: Dialog
    DialogChoice: DialogChoice
    Dragger: Dragger
    EditableService: EditableService
    EulerRotationCurve: EulerRotationCurve
    EventIngestService: EventIngestService
    ExperienceAuthService: ExperienceAuthService
    Explosion: Explosion
    FaceControls: FaceControls
    FaceInstance: FaceInstance
    Decal: Decal
    Texture: Texture
    FacialAnimationStreamingServiceV2: FacialAnimationStreamingServiceV2
    Feature: Feature
    Hole: Hole
    MotorFeature: MotorFeature
    FeatureRestrictionManager: FeatureRestrictionManager
    Fire: Fire
    // FlagStandService: FlagStandService
    FloatCurve: FloatCurve
    // FlyweightService: FlyweightService
    // CSGDictionaryService: CSGDictionaryService
    // NonReplicatedCSGDictionaryService: NonReplicatedCSGDictionaryService
    Folder: Folder
    ForceField: ForceField
    // FriendService: FriendService
    // FunctionalTest: FunctionalTest
    GamePassService: GamePassService
    GenerationService: GenerationService
    GenericChallengeService: GenericChallengeService
    // Geometry: Geometry 
    GeometryService: GeometryService
    // GoogleAnalyticsConfiguration: GoogleAnalyticsConfiguration
    GuiBase: GuiBase
    GuiBase2d: GuiBase2d
    GuiObject: GuiObject
    CanvasGroup: CanvasGroup
    Frame: Frame
    GuiButton: GuiButton
    ImageButton: ImageButton
    TextButton: TextButton
    GuiLabel: GuiLabel
    ImageLabel: ImageLabel
    TextLabel: TextLabel
    ScrollingFrame: ScrollingFrame
    TextBox: TextBox
    VideoDisplay: VideoDisplay
    VideoFrame: VideoFrame
    ViewportFrame: ViewportFrame
    LayerCollector: LayerCollector
    BillboardGui: BillboardGui
    ScreenGui: ScreenGui
    // GuiMain: GuiMain
    SurfaceGuiBase: SurfaceGuiBase
    AdGui: AdGui
    SurfaceGui: SurfaceGui
    GuiBase3d: GuiBase3d
    FloorWire: FloorWire
    InstanceAdornment: InstanceAdornment
    SelectionBox: SelectionBox
    PVAdornment: PVAdornment
    HandleAdornment: HandleAdornment
    BoxHandleAdornment: BoxHandleAdornment
    ConeHandleAdornment: ConeHandleAdornment
    CylinderHandleAdornment: CylinderHandleAdornment
    ImageHandleAdornment: ImageHandleAdornment
    LineHandleAdornment: LineHandleAdornment
    SphereHandleAdornment: SphereHandleAdornment
    ParabolaAdornment: ParabolaAdornment
    SelectionSphere: SelectionSphere
    PartAdornment: PartAdornment
    HandlesBase: HandlesBase
    ArcHandles: ArcHandles
    Handles: Handles
    SurfaceSelection: SurfaceSelection
    SelectionLasso: SelectionLasso
    SelectionPartLasso: SelectionPartLasso
    SelectionPointLasso: SelectionPointLasso
    Path2D: Path2D
    // GuidRegistryService: GuidRegistryService
    HapticEffect: HapticEffect
    HeapProfilerService: HeapProfilerService
    HeatmapService: HeatmapService
    HiddenSurfaceRemovalAsset: HiddenSurfaceRemovalAsset
    Highlight: Highlight
    // Hopper: Hopper
    // HttpRbxApiService: HttpRbxApiService
    // HttpRequest: HttpRequest
    HttpService: HttpService
    Humanoid: Humanoid
    HumanoidDescription: HumanoidDescription
    HumanoidRigDescription: HumanoidRigDescription
    IKControl: IKControl
    ILegacyStudioBridge: ILegacyStudioBridge
    InputAction: InputAction
    InputBinding: InputBinding
    InputContext: InputContext
    InputObject: InputObject
    InsertService: InsertService
    JointInstance: JointInstance
    DynamicRotate: DynamicRotate
    RotateP: RotateP
    RotateV: RotateV
    Glue: Glue
    ManualSurfaceJointInstance: ManualSurfaceJointInstance
    ManualGlue: ManualGlue
    ManualWeld: ManualWeld
    Motor: Motor
    Motor6D: Motor6D
    Rotate: Rotate
    Snap: Snap
    VelocityMotor: VelocityMotor
    Weld: Weld
    JointsService: JointsService
    // KeyboardService: KeyboardService
    Keyframe: Keyframe
    KeyframeMarker: KeyframeMarker
    Light: Light
    PointLight: PointLight
    SpotLight: SpotLight
    SurfaceLight: SurfaceLight
    Lighting: Lighting
    LiveScriptingService: LiveScriptingService
    LocalizationTable: LocalizationTable
    LodDataEntity: LodDataEntity
    LogService: LogService
    // LoginService: LoginService
    LuaSourceContainer: LuaSourceContainer
    AuroraScript: AuroraScript
    BaseScript: BaseScript
    Script: Script
    LocalScript: LocalScript
    ModuleScript: ModuleScript
    // LuaWebService: LuaWebService
    MLModelDeliveryService: MLModelDeliveryService
    MarkerCurve: MarkerCurve
    MarketplaceService: MarketplaceService
    MaterialService: MaterialService
    MaterialVariant: MaterialVariant
    MemoryStoreService: MemoryStoreService
    // Message: Message
    // Hint: Hint
    Mouse: Mouse
    PlayerMouse: PlayerMouse
    // PluginMouse: PluginMouse
    NetworkMarker: NetworkMarker
    // NetworkPeer: NetworkPeer
    NoCollisionConstraint: NoCollisionConstraint
    // NotificationService: NotificationService
    OperationGraph: OperationGraph
    PVInstance: PVInstance
    BasePart: BasePart
    CornerWedgePart: CornerWedgePart
    FormFactorPart: FormFactorPart
    Part: Part
    // FlagStand: FlagStand
    Platform: Platform
    Seat: Seat
    SpawnLocation: SpawnLocation
    WedgePart: WedgePart
    Terrain: Terrain
    TriangleMeshPart: TriangleMeshPart
    MeshPart: MeshPart
    PartOperation: PartOperation
    IntersectOperation: IntersectOperation
    NegateOperation: NegateOperation
    UnionOperation: UnionOperation
    TrussPart: TrussPart
    VehicleSeat: VehicleSeat
    Model: Model
    Actor: Actor
    BackpackItem: BackpackItem
    // HopperBin: HopperBin
    Tool: Tool
    // Flag: Flag
    // Status: Status
    WorldRoot: WorldRoot
    Workspace: Workspace
    WorldModel: WorldModel
    PackageLink: PackageLink
    // PartOperationAsset: PartOperationAsset
    ParticleEmitter: ParticleEmitter
    PathfindingLink: PathfindingLink
    PathfindingModifier: PathfindingModifier
    // PermissionsService: PermissionsService
    PhysicsService: PhysicsService
    Player: Player
    PlayerHydrationService: PlayerHydrationService
    Players: Players
    // Plugin: Plugin
    PluginCapabilities: PluginCapabilities
    // PluginManager: PluginManager
    // PluginToolbar: PluginToolbar
    // PluginToolbarButton: PluginToolbarButton
    // PointsService: PointsService
    PoseBase: PoseBase
    NumberPose: NumberPose
    Pose: Pose
    PostEffect: PostEffect
    BloomEffect: BloomEffect
    BlurEffect: BlurEffect
    ColorCorrectionEffect: ColorCorrectionEffect
    ColorGradingEffect: ColorGradingEffect
    DepthOfFieldEffect: DepthOfFieldEffect
    SunRaysEffect: SunRaysEffect
    ProcessInstancePhysicsService: ProcessInstancePhysicsService
    ProximityPrompt: ProximityPrompt
    ProximityPromptService: ProximityPromptService
    // RbxAnalyticsService: RbxAnalyticsService
    // ReflectionMetadata: ReflectionMetadata
    // ReflectionMetadataCallbacks: ReflectionMetadataCallbacks
    // ReflectionMetadataClasses: ReflectionMetadataClasses
    // ReflectionMetadataEnums: ReflectionMetadataEnums
    // ReflectionMetadataEvents: ReflectionMetadataEvents
    // ReflectionMetadataFunctions: ReflectionMetadataFunctions
    // ReflectionMetadataItem: ReflectionMetadataItem
    // ReflectionMetadataClass: ReflectionMetadataClass
    // ReflectionMetadataEnum: ReflectionMetadataEnum
    // ReflectionMetadataEnumItem: ReflectionMetadataEnumItem
    // ReflectionMetadataMember: ReflectionMetadataMember
    // ReflectionMetadataProperties: ReflectionMetadataProperties
    // ReflectionMetadataYieldFunctions: ReflectionMetadataYieldFunctions
    RemoteCursorService: RemoteCursorService
    RemoteFunction: RemoteFunction
    // RenderingTest: RenderingTest
    ReplicatedFirst: ReplicatedFirst
    ReplicatedStorage: ReplicatedStorage
    // RobloxReplicatedStorage: RobloxReplicatedStorage
    RomarkRbxAnalyticsService: RomarkRbxAnalyticsService
    RomarkService: RomarkService
    RotationCurve: RotationCurve
    SafetyService: SafetyService
    // ScriptDebugger: ScriptDebugger
    ScriptProfilerService: ScriptProfilerService
    // ScriptService: ScriptService
    // Selection: Selection
    SelectionHighlightManager: SelectionHighlightManager
    SensorBase: SensorBase
    AtmosphereSensor: AtmosphereSensor
    BuoyancySensor: BuoyancySensor
    ControllerSensor: ControllerSensor
    ControllerPartSensor: ControllerPartSensor
    FluidForceSensor: FluidForceSensor
    SerializationService: SerializationService
    ServiceProvider: ServiceProvider
    DataModel: DataModel
    GenericSettings: GenericSettings
    // AnalysticsSettings: AnalysticsSettings
    // GlobalSettings: GlobalSettings
    UserSettings: UserSettings
    ServiceVisibilityService: ServiceVisibilityService
    SessionService: SessionService
    Sky: Sky
    Smoke: Smoke
    Sound: Sound
    SoundEffect: SoundEffect
    ChorusSoundEffect: ChorusSoundEffect
    CompressorSoundEffect: CompressorSoundEffect
    CustomSoundEffect: CustomSoundEffect
    AssetSoundEffect: AssetSoundEffect
    ChannelSelectorSoundEffect: ChannelSelectorSoundEffect
    DistortionSoundEffect: DistortionSoundEffect
    EchoSoundEffect: EchoSoundEffect
    EqualizerSoundEffect: EqualizerSoundEffect
    FlangeSoundEffect: FlangeSoundEffect
    PitchShiftSoundEffect: PitchShiftSoundEffect
    ReverbSoundEffect: ReverbSoundEffect
    TremoloSoundEffect: TremoloSoundEffect
    SoundGroup: SoundGroup
    SoundService: SoundService
    Sparkles: Sparkles
    // SpawnerService: SpawnerService
    // StandalonePluginScripts: StandalonePluginScripts
    StarterGear: StarterGear
    StarterPack: StarterPack
    StarterPlayer: StarterPlayer
    StarterPlayerScripts: StarterPlayerScripts
    StarterCharacterScripts: StarterCharacterScripts
    Stats: Stats
    // StatsItem: StatsItem
    // RunningAverageItemDouble: RunningAverageItemDouble
    // RunningAverageItemInt: RunningAverageItemInt
    // RunningAverageTimeIntervalItem: RunningAverageTimeIntervalItem
    // TotalCountTimeIntervalItem: TotalCountTimeIntervalItem
    // StudioData: StudioData
    StyleBase: StyleBase
    StyleRule: StyleRule
    StyleSheet: StyleSheet
    StyleDerive: StyleDerive
    StyleLink: StyleLink
    SurfaceAppearance: SurfaceAppearance
    Team: Team
    TeamCreateData: TeamCreateData
    TeamCreatePublishService: TeamCreatePublishService
    Teams: Teams
    TeleportAsyncResult: TeleportAsyncResult
    TeleportOptions: TeleportOptions
    TeleportService: TeleportService
    TerrainDetail: TerrainDetail
    TerrainRegion: TerrainRegion
    TestService: TestService
    TextBoxService: TextBoxService
    TextChannel: TextChannel
    TextChatCommand: TextChatCommand
    BubbleChatConfiguration: BubbleChatConfiguration
    ChannelTabsConfiguration: ChannelTabsConfiguration
    ChatInputBarConfiguration: ChatInputBarConfiguration
    ChatWindowConfiguration: ChatWindowConfiguration
    TextChatMessage: TextChatMessage
    TextChatMessageProperties: TextChatMessageProperties
    BubbleChatMessageProperties: BubbleChatMessageProperties
    ChatWindowMessageProperties: ChatWindowMessageProperties
    TextChatService: TextChatService
    TextSource: TextSource
    // TimerService: TimerService
    // TouchInputService: TouchInputService
    TouchTransmitter: TouchTransmitter
    Trail: Trail
    TweenBase: TweenBase
    Tween: Tween
    TweenService: TweenService
    UGCAvatarService: UGCAvatarService
    UIBase: UIBase
    UIComponent: UIComponent
    UIConstraint: UIConstraint
    UIAspectRatioConstraint: UIAspectRatioConstraint
    UISizeConstraint: UISizeConstraint
    UITextSizeConstraint: UITextSizeConstraint
    UICorner: UICorner
    UIDragDetector: UIDragDetector
    UIFlexItem: UIFlexItem
    UIGradient: UIGradient
    UILayout: UILayout
    UIGridStyleLayout: UIGridStyleLayout
    UIGridLayout: UIGridLayout
    UIListLayout: UIListLayout
    UIPageLayout: UIPageLayout
    UITableLayout: UITableLayout
    UIPadding: UIPadding
    UIScale: UIScale
    UIStroke: UIStroke
    UniqueIdLookupService: UniqueIdLookupService
    UnvalidatedAssetService: UnvalidatedAssetService
    UserService: UserService
    VRService: VRService
    VRStatusService: VRStatusService
    ValueBase: ValueBase
    // BinaryStringValue: BinaryStringValue
    BoolValue: BoolValue
    BrickColorValue: BrickColorValue
    CFrameValue: CFrameValue
    Color3Value: Color3Value
    DoubleConstrainedValue: DoubleConstrainedValue
    IntConstrainedValue: IntConstrainedValue
    IntValue: IntValue
    NumberValue: NumberValue
    ObjectValue: ObjectValue
    RayValue: RayValue
    StringValue: StringValue
    Vector3Value: Vector3Value
    Vector3Curve: Vector3Curve
    // VersionControlService: VersionControlService
    VideoCaptureService: VideoCaptureService
    VideoPlayer: VideoPlayer
    VideoService: VideoService
    // VirtualInputManager: VirtualInputManager
    VisibilityCheckDispatcher: VisibilityCheckDispatcher
    VisualizationMode: VisualizationMode
    VisualizationModeCategory: VisualizationModeCategory
    VisualizationModeService: VisualizationModeService
    VoiceChatInternal: VoiceChatInternal
    VoiceChatService: VoiceChatService
    WeldConstraint: WeldConstraint
    Wire: Wire
}

export default light;