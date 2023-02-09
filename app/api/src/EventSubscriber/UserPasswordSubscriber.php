<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserPasswordSubscriber implements EventSubscriberInterface
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['setPassword', EventPriorities::POST_VALIDATE]
        ];
    }

    public function setPassword(ViewEvent $event)
    {
        $user = $event->getControllerResult();
        $content = json_decode($event->getRequest()->getContent(), true);
        if ($user instanceof User && $user->getPassword() && $content && array_key_exists('password', $content)) {
            $password = $this->passwordHasher->hashPassword($user, $user->getPassword());
            $user->setPassword($password);
        }
    }
}