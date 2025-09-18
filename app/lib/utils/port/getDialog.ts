const getDialogue = (user: any) => {
  const isRejected = user?.rejectedAt && user?.rejectedAt !== ''

  if (isRejected) {
    return [
      {
        speaker: 'Quartermaster',
        text: "I'm afraid your application has been denied, swabbie.",
        subtext: user?.rejectionReason || 'The Council has made their decision.'
      }
    ]
  }

  if (user?.membershipStatus === 'ACTIVE') {
    return [
      {
        speaker: 'Quartermaster',
        text: 'Welcome aboard, Captain! Your exploration permit has been approved.',
        subtext: 'The frontier awaits your leadership. May fortune favor your expeditions.'
      }
    ]
  }

  if (user?.isBackgroudCheckCompleted) {
    return [
      {
        speaker: 'Quartermaster',
        text: 'Your background verification is complete, swabbie.',
        subtext: 'The Council is now deliberating on your final acceptance. Stay vigilant.'
      }
    ]
  }

  if (user?.isInitialReviewCompleted) {
    return [
      {
        speaker: 'Quartermaster',
        text: 'Your initial review has passed, brave soul.',
        subtext: "We're now conducting standard verification protocols. This may take some time."
      }
    ]
  }

  // Default for new applications
  return [
    {
      speaker: 'Quartermaster',
      text: 'Welcome to the Quarterdeck, swabbie.',
      subtext: 'Step careful now — the choices ye make here shape the voyage ahead.'
    },
    {
      speaker: 'Quartermaster',
      text: 'What course shall we chart next?',
      subtext: 'Choose wisely, sailor — each heading carries its own tide.'
    }
  ]
}

export default getDialogue
