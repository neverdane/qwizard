<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Question;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class QuestionSubscriber implements EventSubscriberInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['answerQuestion', EventPriorities::PRE_VALIDATE],
        ];
    }

    /**
     * @param GetResponseForControllerResultEvent $event
     */
    public function answerQuestion(GetResponseForControllerResultEvent $event)
    {
        $request = $event->getRequest();

        if ('api_questions_put_item' !== $request->attributes->get('_route')) {
            return;
        }

        /** @var Question $question */
        $question = $event->getControllerResult();
        $response = strtolower(trim($question->getResponse()));
        $rightAnswer = strtolower(trim($question->getCard()->getAnswer()));
        $question->setAnswerAsRight($response === $rightAnswer);
        $event->setControllerResult($question);
    }
}
