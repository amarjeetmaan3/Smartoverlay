export class AnimationKeyframeManager {
  add(track, time, values = {}) {
    if (!track.keyframes) track.keyframes = [];
    const frame = { time: Math.max(0, Number(time) || 0), values: { ...values } };
    track.keyframes.push(frame);
    track.keyframes.sort((a, b) => a.time - b.time);
    return frame;
  }
  remove(track, time) {
    track.keyframes = (track.keyframes || []).filter(x => x.time !== Number(time));
    return track.keyframes;
  }
  getAt(track, time) {
    return (track.keyframes || []).find(x => x.time === Number(time)) || null;
  }
}
export default AnimationKeyframeManager;
