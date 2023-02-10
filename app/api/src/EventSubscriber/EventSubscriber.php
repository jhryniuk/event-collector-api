<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Event;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class EventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDates', EventPriorities::PRE_WRITE]
        ];
    }

    public function setDates(ViewEvent $event)
    {
        $eventEntity = $event->getControllerResult();
        if ($eventEntity instanceof Event) {
            $date = new \DateTime();

            if (!$eventEntity->getId()) {
                $eventEntity->setCreatedAt($date);
            }

            $eventEntity->setUpdatedAt($date);
        }
    }
}
