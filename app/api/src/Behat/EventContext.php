<?php

namespace App\Behat;

use App\Entity\Event;
use Behat\Gherkin\Node\TableNode;
use Doctrine\ORM\EntityManagerInterface;

class EventContext extends AbstractContext
{
    /**
     * @Given the following events exists in db:
     */
    public function theFollowingEventsExistsInDb(TableNode $table)
    {
        /** @var EntityManagerInterface $em */
        $em = $this->container->get('doctrine')->getManager();
        foreach ($table as $row) {
            $event = new Event();
            $event->setName($row['name']);
            $event->setStartDateTime(\DateTime::createFromFormat('Y-m-d\TH:i:s', $row['start date']));
            $event->setEndDateTime(\DateTime::createFromFormat('Y-m-d\TH:i:s', $row['end date']));
            $event->setCreatedAt(new \DateTime());
            $event->setUpdatedAt(new \DateTime());

            $em->persist($event);
            $em->flush();
        }
    }
}
