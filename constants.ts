import type { Transformation } from './types';

export const TRANSFORMATIONS: Transformation[] = [
  // User-added templates from JSON
  {
    key: "figurineDesign",
    titleKey: "transformations.effects.figurineDesign.title",
    prompt: "Create a 1/7 scale commercialized figurine of the characters in the picture, in a realistic style, in a real environment. The figurine is placed on a computer desk. The figurine has a round transparent acrylic base, with no text on the base. The content on the computer screen is a 3D modeling process of this figurine. Next to the computer screen is a toy packaging box, designed in a style reminiscent of high-quality collectible figures, printed with original artwork. The packaging features two-dimensional flat illustrations.",
    emoji: "🔥",
    descriptionKey: "transformations.effects.figurineDesign.description",
  },
  {
    key: "photoFix",
    titleKey: "transformations.effects.photoFix.title",
    prompt: "This is a technical and stylistic re-rendering of a vintage photograph. The goal is to make this exact scene—with the same people, outfits, poses, and scenery—look as if it were captured today by an elite portrait photographer using modern, professional equipment and a vibrant color grading style. Do not change any element of the scene; instead, fundamentally transform the quality of the image capture itself. 1. Vibrant, Saturated Color Science (New Priority): This is the most important instruction: The color grading must be completely modernized, vibrant, and deeply saturated. Remove every trace of the original's faded, vintage color cast. The final colors should pop with life and energy, emulating a modern digital camera using a 'Vivid' color profile. Specifically: Make any floral patterns rich and bold. Render solid colors as strong, clean, and striking. Ensure all skin tones are warm, healthy, and full of life—completely avoiding a pale, washed-out, or muted appearance. 2. Lighting Transformation: Completely discard the original's harsh, on-camera flash lighting. Re-light the entire scene as if using a professional, off-camera studio setup. Create a large, soft key light from the front-left to sculpt the subjects' faces with gentle, flattering shadows, creating depth and dimension. Add a subtle fill light from the right to soften the shadows. Eliminate the harsh glare on any glasses and create bright, sparkling catchlights in everyone's eyes. 3. Hyper-Realistic Detail and Texture: Render the image with extreme 8K clarity. Skin must look natural, retaining age-appropriate pores and fine lines—strictly avoid a plastic or airbrushed appearance. The fabric textures must be hyper-defined: clearly show any intricate knitting, weaves of patterns, and texture of upholstery. Any wallpaper pattern should be sharp and clear. 4. Modern Camera and Lens Optics: The final image must look like it was captured on a high-end, full-frame digital camera with a sharp 85mm prime lens to create a subtle, natural separation between the subjects and the background. Ensure the dynamic range is wide, with deep, rich blacks and clean, controlled highlights.",
    emoji: "📸",
    descriptionKey: "transformations.effects.photoFix.description",
  },
  {
    key: "homeDesign",
    titleKey: "transformations.effects.homeDesign.title",
    prompt: "This is a photo of an empty living room [Empty Room Photo]. Redesign it in a cozy Scandinavian style. Add a light grey fabric sofa, a natural oak wood coffee table, several green potted plants, and a large, soft wool rug. The lighting should be bright and airy, coming from the window.",
    emoji: "🛋️",
    descriptionKey: "transformations.effects.homeDesign.description",
  },
  {
    key: "noirComicPanel",
    titleKey: "transformations.effects.noirComicPanel.title",
    prompt: "Analyze the input image and convert it into a single, square noir comic panel: preserve the main subject and overall composition, restyle in gritty, high-contrast black-and-white inks with harsh, dramatic lighting, deep blacks, and crisp highlights; add a clean panel border and an optional small caption box area at the top (empty); use strong shadows and subtle rain/atmospheric effects only if they enhance mood; no color, no gradients; final aspect ratio 1:1.",
    emoji: "🕵️",
    descriptionKey: "transformations.effects.noirComicPanel.description",
  },
  {
    key: "miniatureProductAd",
    titleKey: "transformations.effects.miniatureProductAd.title",
    prompt: "A high-resolution advertising photograph of a realistic, miniature this thing held delicately between a person's thumb and index finger. clean and white background, studio lighting, soft shadows. The hand is well-groomed, natural skin tone, and positioned to highlight the product's shape and details. The product appears extremely small but hyper-detailed and brand-accurate, centered in the frame with a shallow depth of field. Emulates luxury product photography and minimalist commercial style.",
    emoji: "🤏",
    descriptionKey: "transformations.effects.miniatureProductAd.description",
  },
  {
    key: "kawaiiSticker",
    titleKey: "transformations.effects.kawaiiSticker.title",
    prompt: "Analyze the input image and extract the main subject. Design a kawaii-style square sticker of that subject: bold, clean outlines, simple cel-shading, vibrant color palette, centered composition, and a pure white background. Keep the subject recognizable while simplifying shapes; add a neat white die-cut border. Avoid text, logos, and busy backgrounds; the result should look like a minimalist commercial sticker.",
    emoji: "💖",
    descriptionKey: "transformations.effects.kawaiiSticker.description",
  },
  {
    key: "amigurumiCrochet",
    titleKey: "transformations.effects.amigurumiCrochet.title",
    prompt: "A high-resolution, studio-lit, hyper-realistic amigurumi product photograph. Transform the main subject (animal or character) from the input image into a handcrafted crochet item, presented on a polished concrete surface. Use three-point softbox lighting to create soft, diffused highlights that eliminate harsh shadows. Shot from a slightly elevated 45-degree angle to showcase clean lines. Features visible yarn texture, stitch details, and soft, felt-like proportions. Has tiny embroidered eyes and simplified facial features. Includes realistic fabric shadows and subtle fuzz for depth of field. Hyperrealistic style with sharp focus point. Neutral gray-toned background for professional presentation. Square 1080x1080 format image.",
    emoji: "🧶",
    descriptionKey: "transformations.effects.amigurumiCrochet.description",
  },
  {
    key: "lineArtExtraction",
    titleKey: "transformations.effects.lineArtExtraction.title",
    prompt: "使用提供的图片，将主要图案/主题的视觉元素精细地转化为纯粹的线条艺术。仅勾勒出图案的轮廓和内部结构线，忽略所有光影、纹理和色彩信息。最终图像应为清晰、简洁的黑白线条图，精确地描绘出原始图案的形状和细节。",
    emoji: "✒️",
    descriptionKey: "transformations.effects.lineArtExtraction.description",
  },
  {
    key: "emotionGrid16",
    titleKey: "transformations.effects.emotionGrid16.title",
    prompt: "Create a 4x4 grid (16 panels total) featuring the upper body character from the input image displaying 16 different exaggerated emotions. Each panel should show only the upper torso and head of the character with dramatically expressive facial expressions and body language. Layout requirements: - Evenly divide the image into 16 equal squares arranged in a 4x4 grid - Separate each panel with thin white lines - Each panel can have different background colors and artistic styles while maintaining consistent character structure - Below each expression, include the corresponding English emotion word in rounded cartoon font style (white text with black outline) Expression variety: Include diverse emotions such as: happy, sad, angry, surprised, confused, excited, sleepy, worried, laughing, crying, shocked, bored, love-struck, frustrated, determined, and silly. Visual style: - Exaggerated and dynamic expressions full of personality and humor - Consistent character design across all 16 panels - Vibrant and varied color schemes for each panel background - Cartoon/anime art style with bold, expressive features - High contrast and clear visibility for all text labels",
    emoji: "😆",
    descriptionKey: "transformations.effects.emotionGrid16.description",
  },
  {
    key: "marbleStatue",
    titleKey: "transformations.effects.marbleStatue.title",
    prompt: "Convert this illustration into a photorealistic marble statue without any paintwork. Faithfully reproduce the character's design and pose, focusing on the figure itself. Render it as a marble statue with a realistic marble surface and detailed shading. Place the statue on a marble pedestal, positioned to cast a soft shadow beneath it. Achieve a fine art photograph-like finish using museum-quality backgrounds, professional lighting, sharp focus, and shallow depth of field.",
    emoji: "🏛️",
    descriptionKey: "transformations.effects.marbleStatue.description",
  },
  {
    key: "vintageTinToy",
    titleKey: "transformations.effects.vintageTinToy.title",
    prompt: "[uploaded image] rendered as vintage tin toy, clockwork key in back; weathered paint chips, micro-scratches, shot on wood workbench with retro tungsten bulb, 100 mm macro, tilt-shift",
    emoji: "🤖",
    descriptionKey: "transformations.effects.vintageTinToy.description",
  },
  {
    key: "waterDropletReflection",
    titleKey: "transformations.effects.waterDropletReflection.title",
    prompt: "Create an ultra-high-definition, photorealistic image of a single crystal-clear water droplet resting on a vibrant green leaf. Inside the droplet, perfectly reflect the content of the uploaded image, ensuring all details of that image are sharply visible and undistorted. Emphasize the intricate texture and veins of the leaf beneath the droplet, and capture realistic light refractions and micro-surface reflections on the water. Use natural, soft ambient lighting to highlight the dew drop's clarity and depth, and maintain a harmonious balance between the organic leaf texture and the urban or subject-specific elements from the uploaded image inside the droplet",
    emoji: "💧",
    descriptionKey: "transformations.effects.waterDropletReflection.description",
  },

  // Prioritized items as requested by the user
  {
    key: "memePack",
    titleKey: "transformations.effects.memePack.title",
    prompt: "生成4宫格的表情包，展现4种不同的表情，分别是喜、怒、哀、乐。纯色背景。",
    emoji: "😂",
    descriptionKey: "transformations.effects.memePack.description",
  },
  {
    key: "knittedDoll",
    titleKey: "transformations.effects.knittedDoll.title",
    prompt: "一张特写、构图专业的照片，展示一个手工钩织的毛线玩偶被双手轻柔地托着。玩偶造型圆润，生成图片1人物的可爱Q版形象，色彩对比鲜明，细节丰富。持玩偶的双手自然、温柔，手指姿态清晰可见，皮肤质感与光影过渡自然，展现出温暖且真实的触感。背景轻微虚化，表现为室内环境，有温暖的木质桌面和从窗户洒入的自然光，营造出舒适、亲密的氛围。整体画面传达出精湛的工艺感与被珍视的温馨情绪。",
    emoji: "🧸",
    descriptionKey: "transformations.effects.knittedDoll.description",
  },
  {
    key: "desktopFigurine",
    titleKey: "transformations.effects.desktopFigurine.title",
    prompt: "将此插画转化为超写实 PVC 动漫手办。需完全保留角色原有的设计、姿势与色彩。将其渲染为 PVC 塑料材质的收藏级手办，表面涂装需高度写实，阴影细节丰富。在头发、衣物等部位添加亮面高光，皮肤则采用哑光质感，同时呈现出真实量产手办中常见的细微合模线。将手办置于简约圆形展示底座上，下方投射柔和阴影。背景是有电脑的办公桌，搭配专业摄影灯光，画面对焦清晰、景深较浅，整体效果如同为产品目录拍摄的实物照片。",
    emoji: "✨",
    descriptionKey: "transformations.effects.desktopFigurine.description",
  },
  {
    key: "giantDoll",
    titleKey: "transformations.effects.giantDoll.title",
    prompt: "现代艺术画廊中，一尊风格化巨型玩偶特写呈现（占据前景主导位置，风格与参考图一致）。上传图片的角色在玩偶旁摆出姿势。玩偶的穿搭与上传角色相呼应。画廊内，白色墙面与天花板天窗相映，背景中挂着带框艺术品。光线方面：采用明亮均匀的画廊室内光。风格特点：整体写实，兼具趣味与艺术氛围，着重突出玩偶巨大的尺寸及其居于画面中心的视觉主导地位。",
    emoji: "🐘",
    descriptionKey: "transformations.effects.giantDoll.description",
  },
  {
    key: "flatLay",
    titleKey: "transformations.effects.flatLay.title",
    prompt: "在一张平铺照片上，展示图中涉及的所有服装单品。",
    emoji: "👕",
    descriptionKey: "transformations.effects.flatLay.description",
  },
  {
    key: "commercialPhoto",
    titleKey: "transformations.effects.commercialPhoto.title",
    prompt: "将上传角色调成商业大片的角色，时尚，高级，服饰、妆容、背景随机调整。",
    emoji: "📸",
    descriptionKey: "transformations.effects.commercialPhoto.description",
  },
  {
    key: "polaroid",
    titleKey: "transformations.effects.polaroid.title",
    prompt: "生成一张亲密合照的拍立得照片。照片带有略微的模糊效果，使用闪光灯在室内拍摄，仿佛派对刚结束。保持亲密又搞笑的姿势，捕捉到轻松有趣的氛围，带有温馨与幽默感",
    emoji: "🎞️",
    descriptionKey: "transformations.effects.polaroid.description",
    maxImages: 4,
  },
  { 
    key: "customPrompt",
    titleKey: "transformations.effects.customPrompt.title", 
    prompt: "CUSTOM", 
    emoji: "✍️",
    descriptionKey: "transformations.effects.customPrompt.description",
    isMultiImage: true,
    isSecondaryOptional: true,
    primaryUploaderTitle: "transformations.effects.customPrompt.uploader1Title",
    primaryUploaderDescription: "transformations.effects.customPrompt.uploader1Desc",
    secondaryUploaderTitle: "transformations.effects.customPrompt.uploader2Title",
    secondaryUploaderDescription: "transformations.effects.customPrompt.uploader2Desc",
  },
  { 
    key: "figurine",
    titleKey: "transformations.effects.figurine.title", 
    prompt: "turn this photo into a character figure. Behind it, place a box with the character’s image printed on it, and a computer showing the Blender modeling process on its screen. In front of the box, add a round plastic base with the character figure standing on it. set the scene indoors if possible", 
    emoji: "🧍",
    descriptionKey: "transformations.effects.figurine.description"
  },
  { 
    key: "cosplay",
    titleKey: "transformations.effects.cosplay.title", 
    prompt: "Generate a highly detailed photo of a girl cosplaying this illustration, at Comiket. Exactly replicate the same pose, body posture, hand gestures, facial expression, and camera framing as in the original illustration. Keep the same angle, perspective, and composition, without any deviation", 
    emoji: "🎭",
    descriptionKey: "transformations.effects.cosplay.description"
  },
  {
    key: "category_effects",
    titleKey: "transformations.categories.effects.title",
    emoji: "✨",
    items: [
      { key: "pixelArt", titleKey: "transformations.effects.pixelArt.title", prompt: "Redraw the image in a retro 8-bit pixel art style.", emoji: "👾", descriptionKey: "transformations.effects.pixelArt.description" },
      { key: "watercolor", titleKey: "transformations.effects.watercolor.title", prompt: "Transform the image into a soft and vibrant watercolor painting.", emoji: "🖌️", descriptionKey: "transformations.effects.watercolor.description" },
      { key: "popArt", titleKey: "transformations.effects.popArt.title", prompt: "Reimagine the image in the style of Andy Warhol's pop art, with bold colors and screen-print effects.", emoji: "🎨", descriptionKey: "transformations.effects.popArt.description" },
      { key: "comicBook", titleKey: "transformations.effects.comicBook.title", prompt: "Convert the image into a classic comic book panel with halftones, bold outlines, and action text.", emoji: "💥", descriptionKey: "transformations.effects.comicBook.description" },
      { key: "claymation", titleKey: "transformations.effects.claymation.title", prompt: "Recreate the image as a charming stop-motion claymation scene.", emoji: "🗿", descriptionKey: "transformations.effects.claymation.description" },
      { key: "ukiyoE", titleKey: "transformations.effects.ukiyoE.title", prompt: "Redraw the image in the style of a traditional Japanese Ukiyo-e woodblock print.", emoji: "🌊", descriptionKey: "transformations.effects.ukiyoE.description" },
      { key: "stainedGlass", titleKey: "transformations.effects.stainedGlass.title", prompt: "Transform the image into a vibrant stained glass window with dark lead lines.", emoji: "🪟", descriptionKey: "transformations.effects.stainedGlass.description" },
      { key: "origami", titleKey: "transformations.effects.origami.title", prompt: "Reconstruct the subject of the image using folded paper in an origami style.", emoji: "🦢", descriptionKey: "transformations.effects.origami.description" },
      { key: "neonGlow", titleKey: "transformations.effects.neonGlow.title", prompt: "Outline the subject in bright, glowing neon lights against a dark background.", emoji: "💡", descriptionKey: "transformations.effects.neonGlow.description" },
      { key: "doodleArt", titleKey: "transformations.effects.doodleArt.title", prompt: "Overlay the image with playful, hand-drawn doodle-style illustrations.", emoji: "✏️", descriptionKey: "transformations.effects.doodleArt.description" },
      { key: "vintagePhoto", titleKey: "transformations.effects.vintagePhoto.title", prompt: "Give the image an aged, sepia-toned vintage photograph look from the early 20th century.", emoji: "📜", descriptionKey: "transformations.effects.vintagePhoto.description" },
      { key: "blueprintSketch", titleKey: "transformations.effects.blueprintSketch.title", prompt: "Convert the image into a technical blueprint-style architectural drawing.", emoji: "📐", descriptionKey: "transformations.effects.blueprintSketch.description" },
      { key: "glitchArt", titleKey: "transformations.effects.glitchArt.title", prompt: "Apply a digital glitch effect with datamoshing, pixel sorting, and RGB shifts.", emoji: "📉", descriptionKey: "transformations.effects.glitchArt.description" },
      { key: "doubleExposure", titleKey: "transformations.effects.doubleExposure.title", prompt: "Create a double exposure effect, blending the image with a nature scene like a forest or a mountain range.", emoji: "🏞️", descriptionKey: "transformations.effects.doubleExposure.description" },
      { key: "hologram", titleKey: "transformations.effects.hologram.title", prompt: "Project the subject as a futuristic, glowing blue hologram.", emoji: "🌐", descriptionKey: "transformations.effects.hologram.description" },
      { key: "lowPoly", titleKey: "transformations.effects.lowPoly.title", prompt: "Reconstruct the image using a low-polygon geometric mesh.", emoji: "🔺", descriptionKey: "transformations.effects.lowPoly.description" },
      { key: "charcoalSketch", titleKey: "transformations.effects.charcoalSketch.title", prompt: "Redraw the image as a dramatic, high-contrast charcoal sketch on textured paper.", emoji: "✍🏽", descriptionKey: "transformations.effects.charcoalSketch.description" },
      { key: "impressionism", titleKey: "transformations.effects.impressionism.title", prompt: "Repaint the image in the style of an Impressionist masterpiece, with visible brushstrokes and a focus on light.", emoji: "👨‍🎨", descriptionKey: "transformations.effects.impressionism.description" },
      { key: "cubism", titleKey: "transformations.effects.cubism.title", prompt: "Deconstruct and reassemble the subject in the abstract, geometric style of Cubism.", emoji: "🧊", descriptionKey: "transformations.effects.cubism.description" },
      { key: "steampunk", titleKey: "transformations.effects.steampunk.title", prompt: "Reimagine the subject with steampunk aesthetics, featuring gears, brass, and Victorian-era technology.", emoji: "⚙️", descriptionKey: "transformations.effects.steampunk.description" },
      { key: "fantasyArt", titleKey: "transformations.effects.fantasyArt.title", prompt: "Transform the image into an epic fantasy-style painting, with magical elements and dramatic lighting.", emoji: "🐉", descriptionKey: "transformations.effects.fantasyArt.description" },
      { key: "graffiti", titleKey: "transformations.effects.graffiti.title", prompt: "Spray-paint the image as vibrant graffiti on a brick wall.", emoji: "🎨", descriptionKey: "transformations.effects.graffiti.description" },
      { key: "minimalistLineArt", titleKey: "transformations.effects.minimalistLineArt.title", prompt: "Reduce the image to a single, continuous, minimalist line drawing.", emoji: "〰️", descriptionKey: "transformations.effects.minimalistLineArt.description" },
      { key: "storybook", titleKey: "transformations.effects.storybook.title", prompt: "Redraw the image in the style of a whimsical children's storybook illustration.", emoji: "📖", descriptionKey: "transformations.effects.storybook.description" },
      { key: "thermal", titleKey: "transformations.effects.thermal.title", prompt: "Apply a thermal imaging effect with a heat map color palette.", emoji: "🌡️", descriptionKey: "transformations.effects.thermal.description" },
      { key: "risograph", titleKey: "transformations.effects.risograph.title", prompt: "Simulate a risograph print effect with grainy textures and limited, overlapping color layers.", emoji: "📠", descriptionKey: "transformations.effects.risograph.description" },
      { key: "crossStitch", titleKey: "transformations.effects.crossStitch.title", prompt: "Convert the image into a textured, handmade cross-stitch pattern.", emoji: "🧵", descriptionKey: "transformations.effects.crossStitch.description" },
      { key: "tattoo", titleKey: "transformations.effects.tattoo.title", prompt: "Redesign the subject as a classic American traditional style tattoo.", emoji: "🖋️", descriptionKey: "transformations.effects.tattoo.description" },
      { key: "psychedelic", titleKey: "transformations.effects.psychedelic.title", prompt: "Apply a vibrant, swirling, psychedelic art style from the 1960s.", emoji: "🌀", descriptionKey: "transformations.effects.psychedelic.description" },
      { key: "gothic", titleKey: "transformations.effects.gothic.title", prompt: "Reimagine the scene with a dark, gothic art style, featuring dramatic shadows and architecture.", emoji: "🏰", descriptionKey: "transformations.effects.gothic.description" },
      { key: "tribal", titleKey: "transformations.effects.tribal.title", prompt: "Redraw the subject using patterns and motifs from traditional tribal art.", emoji: "🗿", descriptionKey: "transformations.effects.tribal.description" },
      { key: "dotPainting", titleKey: "transformations.effects.dotPainting.title", prompt: "Recreate the image using the dot painting technique of Aboriginal art.", emoji: "🎨", descriptionKey: "transformations.effects.dotPainting.description" },
      { key: "chalk", titleKey: "transformations.effects.chalk.title", prompt: "Draw the image as a colorful chalk illustration on a sidewalk.", emoji: "🖍️", descriptionKey: "transformations.effects.chalk.description" },
      { key: "sandArt", titleKey: "transformations.effects.sandArt.title", prompt: "Recreate the image as if it were made from colored sand.", emoji: "🏜️", descriptionKey: "transformations.effects.sandArt.description" },
      { key: "mosaic", titleKey: "transformations.effects.mosaic.title", prompt: "Transform the image into a mosaic made of small ceramic tiles.", emoji: "💠", descriptionKey: "transformations.effects.mosaic.description" },
      { key: "paperQuilling", titleKey: "transformations.effects.paperQuilling.title", prompt: "Reconstruct the subject using the art of paper quilling, with rolled and shaped strips of paper.", emoji: "📜", descriptionKey: "transformations.effects.paperQuilling.description" },
      { key: "woodCarving", titleKey: "transformations.effects.woodCarving.title", prompt: "Recreate the subject as a detailed wood carving.", emoji: "🪵", descriptionKey: "transformations.effects.woodCarving.description" },
      { key: "iceSculpture", titleKey: "transformations.effects.iceSculpture.title", prompt: "Transform the subject into a translucent, detailed ice sculpture.", emoji: "🧊", descriptionKey: "transformations.effects.iceSculpture.description" },
      { key: "bronzeStatue", titleKey: "transformations.effects.bronzeStatue.title", prompt: "Turn the subject into a weathered bronze statue on a pedestal.", emoji: "🗿", descriptionKey: "transformations.effects.bronzeStatue.description" },
      { key: "galaxy", titleKey: "transformations.effects.galaxy.title", prompt: "Blend the image with a vibrant nebula and starry galaxy background.", emoji: "🌌", descriptionKey: "transformations.effects.galaxy.description" },
      { key: "fire", titleKey: "transformations.effects.fire.title", prompt: "Reimagine the subject as if it were formed from roaring flames.", emoji: "🔥", descriptionKey: "transformations.effects.fire.description" },
      { key: "water", titleKey: "transformations.effects.water.title", prompt: "Reimagine the subject as if it were formed from flowing, liquid water.", emoji: "💧", descriptionKey: "transformations.effects.water.description" },
      { key: "smokeArt", titleKey: "transformations.effects.smokeArt.title", prompt: "Create the subject from elegant, swirling wisps of smoke.", emoji: "💨", descriptionKey: "transformations.effects.smokeArt.description" },
      { key: "vectorArt", titleKey: "transformations.effects.vectorArt.title", prompt: "Convert the photo into clean, scalable vector art with flat colors and sharp lines.", emoji: "🎨", descriptionKey: "transformations.effects.vectorArt.description" },
      { key: "infrared", titleKey: "transformations.effects.infrared.title", prompt: "Simulate an infrared photo effect with surreal colors and glowing foliage.", emoji: "📸", descriptionKey: "transformations.effects.infrared.description" },
      { key: "knitted", titleKey: "transformations.effects.knitted.title", prompt: "Recreate the image as a cozy, knitted wool pattern.", emoji: "🧶", descriptionKey: "transformations.effects.knitted.description" },
      { key: "etching", titleKey: "transformations.effects.etching.title", prompt: "Redraw the image as a classic black and white etching or engraving.", emoji: "✒️", descriptionKey: "transformations.effects.etching.description" },
      { key: "diorama", titleKey: "transformations.effects.diorama.title", prompt: "Turn the scene into a miniature 3D diorama inside a box.", emoji: "📦", descriptionKey: "transformations.effects.diorama.description" },
    ]
  },
  { 
    key: "pose",
    titleKey: "transformations.effects.pose.title", 
    prompt: "Apply the pose from the second image to the character in the first image. Render as a professional studio photograph.",
    emoji: "💃",
    descriptionKey: "transformations.effects.pose.description",
    isMultiImage: true,
    primaryUploaderTitle: "transformations.effects.pose.uploader1Title",
    primaryUploaderDescription: "transformations.effects.pose.uploader1Desc",
    secondaryUploaderTitle: "transformations.effects.pose.uploader2Title",
    secondaryUploaderDescription: "transformations.effects.pose.uploader2Desc",
  },
  { 
    key: "expressionReference",
    titleKey: "transformations.effects.expressionReference.title", 
    prompt: "Change the expression of the character in the first image to match the expression of the character in the second image.",
    emoji: "😀",
    descriptionKey: "transformations.effects.expressionReference.description",
    isMultiImage: true,
    primaryUploaderTitle: "transformations.effects.expressionReference.uploader1Title",
    primaryUploaderDescription: "transformations.effects.expressionReference.uploader1Desc",
    secondaryUploaderTitle: "transformations.effects.expressionReference.uploader2Title",
    secondaryUploaderDescription: "transformations.effects.expressionReference.uploader2Desc",
  },
  { 
    key: "lineArt", 
    titleKey: "transformations.effects.lineArt.title", 
    prompt: "Turn the image into a clean, hand-drawn line art sketch.", 
    emoji: "✍🏻", 
    descriptionKey: "transformations.effects.lineArt.description" 
  },
  { 
    key: "colorPalette",
    titleKey: "transformations.effects.colorPalette.title",
    prompt: "Turn this image into a clean, hand-drawn line art sketch.", // Step 1 prompt
    stepTwoPrompt: "Color the line art using the colors from the second image.", // Step 2 prompt
    emoji: "🎨",
    descriptionKey: "transformations.effects.colorPalette.description",
    isMultiImage: true,
    isTwoStep: true,
    primaryUploaderTitle: "transformations.effects.colorPalette.uploader1Title",
    primaryUploaderDescription: "transformations.effects.colorPalette.uploader1Desc",
    secondaryUploaderTitle: "transformations.effects.colorPalette.uploader2Title",
    secondaryUploaderDescription: "transformations.effects.colorPalette.uploader2Desc",
  },
  { 
    key: "iphoneWallpaper",
    titleKey: "transformations.effects.iphoneWallpaper.title", 
    prompt: "Turn the image into an iPhone lock screen wallpaper effect, with the phone's time (01:16), date (Sunday, September 16), and status bar information (battery, signal, etc.), with the flashlight and camera buttons at the bottom, overlaid on the image. The original image should be adapted to a vertical composition that fits a phone screen. The phone is placed on a solid color background of the same color scheme.",
    emoji: "📱",
    descriptionKey: "transformations.effects.iphoneWallpaper.description"
  },
  { 
    key: "sodaCan",
    titleKey: "transformations.effects.sodaCan.title", 
    prompt: "Design a soda can using this image as the main graphic, and show it in a professional product shot.", 
    emoji: "🥤",
    descriptionKey: "transformations.effects.sodaCan.description"
  },
  {
    key: "minimalistIllustration",
    titleKey: "transformations.effects.minimalistIllustration.title",
    prompt: "Turn the people in these images into cute, black and white minimalist illustrations. Each person should be drawn with their unique characteristics and a fitting small prop. The lines should be elegant, and the hair should be a solid black block. Arrange all characters into a single grid image.",
    emoji: "⚫",
    descriptionKey: "transformations.effects.minimalistIllustration.description",
    maxImages: 4,
  },
  // Remaining items from flattened categories
  { 
    key: "funko",
    titleKey: "transformations.effects.funko.title", 
    prompt: "Transform the person into a Funko Pop figure, shown inside and next to its packaging.", 
    emoji: "📦",
    descriptionKey: "transformations.effects.funko.description"
  },
  { 
    key: "lego",
    titleKey: "transformations.effects.lego.title", 
    prompt: "Transform the person into a LEGO minifigure, inside its packaging box.", 
    emoji: "🧱",
    descriptionKey: "transformations.effects.lego.description"
  },
  { 
    key: "crochet",
    titleKey: "transformations.effects.crochet.title", 
    prompt: "Transform the subject into a handmade crocheted yarn doll with a cute, chibi-style appearance.", 
    emoji: "🧶",
    descriptionKey: "transformations.effects.crochet.description"
  },
  { 
    key: "plushie",
    titleKey: "transformations.effects.plushie.title", 
    prompt: "Turn the person in this photo into a cute, soft plushie doll.", 
    emoji: "🧸",
    descriptionKey: "transformations.effects.plushie.description"
  },
  { 
    key: "keychain",
    titleKey: "transformations.effects.keychain.title", 
    prompt: "Turn the subject into a cute acrylic keychain, shown attached to a bag.", 
    emoji: "🔑",
    descriptionKey: "transformations.effects.keychain.description"
  },
  { 
    key: "hdEnhance",
    titleKey: "transformations.effects.hdEnhance.title", 
    prompt: "Enhance this image to high resolution, improving sharpness and clarity.", 
    emoji: "🔍",
    descriptionKey: "transformations.effects.hdEnhance.description"
  },
  { 
    key: "photorealistic",
    titleKey: "transformations.effects.photorealistic.title", 
    prompt: "Turn this illustration into a photorealistic version.", 
    emoji: "🪄",
    descriptionKey: "transformations.effects.photorealistic.description"
  },
  { 
    key: "fashion",
    titleKey: "transformations.effects.fashion.title", 
    prompt: "Transform the photo into a stylized, ultra-realistic fashion magazine portrait with cinematic lighting.", 
    emoji: "📸",
    descriptionKey: "transformations.effects.fashion.description"
  },
  { 
    key: "hyperrealistic",
    titleKey: "transformations.effects.hyperrealistic.title", 
    prompt: "Generate a hyper-realistic, fashion-style photo with strong, direct flash lighting, grainy texture, and a cool, confident pose.", 
    emoji: "✨",
    descriptionKey: "transformations.effects.hyperrealistic.description"
  },
  { 
    key: "architecture",
    titleKey: "transformations.effects.architecture.title", 
    prompt: "Convert this photo of a building into a miniature architecture model, placed on a cardstock in an indoor setting. Show a computer with modeling software in the background.", 
    emoji: "🏗️",
    descriptionKey: "transformations.effects.architecture.description"
  },
  { 
    key: "productRender",
    titleKey: "transformations.effects.productRender.title", 
    prompt: "Turn this product sketch into a photorealistic 3D render with studio lighting.", 
    emoji: "💡",
    descriptionKey: "transformations.effects.productRender.description"
  },
  { 
    key: "industrialDesign",
    titleKey: "transformations.effects.industrialDesign.title", 
    prompt: "Turn this industrial design sketch into a realistic product photo, rendered with light brown leather and displayed in a minimalist museum setting.", 
    emoji: "🛋️",
    descriptionKey: "transformations.effects.industrialDesign.description"
  },
  { 
    key: "isolate",
    titleKey: "transformations.effects.isolate.title", 
    prompt: "Isolate the person in the masked area and generate a high-definition photo of them against a neutral background.", 
    emoji: "🎯",
    descriptionKey: "transformations.effects.isolate.description"
  },
  { 
    key: "screen3d",
    titleKey: "transformations.effects.screen3d.title", 
    prompt: "For an image with a screen, add content that appears to be glasses-free 3D, popping out of the screen.", 
    emoji: "📺",
    descriptionKey: "transformations.effects.screen3d.description"
  },
  { 
    key: "makeup",
    titleKey: "transformations.effects.makeup.title", 
    prompt: "Analyze the makeup in this photo and suggest improvements by drawing with a red pen.", 
    emoji: "💄",
    descriptionKey: "transformations.effects.makeup.description"
  },
  { 
    key: "background",
    titleKey: "transformations.effects.background.title", 
    prompt: "Change the background to a Y2K aesthetic style.", 
    emoji: "🪩",
    descriptionKey: "transformations.effects.background.description"
  },
  { 
    key: "addIllustration",
    titleKey: "transformations.effects.addIllustration.title", 
    prompt: "Add a cute, cartoon-style illustrated couple into the real-world scene, sitting and talking.", 
    emoji: "🧑‍🎨",
    descriptionKey: "transformations.effects.addIllustration.description"
  },
  { 
    key: "paintingProcess", 
    titleKey: "transformations.effects.paintingProcess.title", 
    prompt: "Generate a 4-panel grid showing the artistic process of creating this image, from sketch to final render.", 
    emoji: "🖼️", 
    descriptionKey: "transformations.effects.paintingProcess.description" 
  },
  { 
    key: "markerSketch", 
    titleKey: "transformations.effects.markerSketch.title", 
    prompt: "Redraw the image in the style of a Copic marker sketch, often used in design.", 
    emoji: "🖊️", 
    descriptionKey: "transformations.effects.markerSketch.description" 
  },
  { 
    key: "cyberpunk", 
    titleKey: "transformations.effects.cyberpunk.title", 
    prompt: "Transform the scene into a futuristic cyberpunk city.", 
    emoji: "🤖", 
    descriptionKey: "transformations.effects.cyberpunk.description" 
  },
  { 
    key: "vanGogh", 
    titleKey: "transformations.effects.vanGogh.title", 
    prompt: "Reimagine the photo in the style of Van Gogh's 'Starry Night'.", 
    emoji: "🌌", 
    descriptionKey: "transformations.effects.vanGogh.description" 
  },
];